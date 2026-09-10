setup_file() {
  cd "$BATS_TEST_DIRNAME"
}

teardown() {
  rm -rf products.json storage dataset.json
}

# Like bats' run, but retries up to 3 times if the command fails with HTTP 429
run_retry() {
  local attempt
  for attempt in 1 2 3; do
    run "$@"
    if (( status == 0 )) || [[ "$output" != *429* ]]; then
      return 0
    fi
    echo "Attempt $attempt got HTTP 429, retrying..." >&2
    sleep $(( attempt * 10 ))
  done
}

@test "covers all exercise scripts" {
  local missing
  missing=0

  for file in *.py; do
    if ! grep -q "python $file" test.bats; then
      echo "Missing test for $file"
      missing=1
    fi
  done

  [[ $missing -eq 0 ]]
}

@test "outputs the HTML with Star Wars products" {
  run_retry uv run -q --with=httpx python lego.py

  [[ "$output" == *"Millennium Falcon"* ]]
}

@test "counts the number of F1 Academy teams" {
  run_retry uv run -q --with=httpx --with=beautifulsoup4 python f1academy_teams.py

  [[ "$output" == "6" ]]
}

@test "counts the number of F1 Academy drivers" {
  run_retry uv run -q --with=httpx --with=beautifulsoup4 python f1academy_drivers.py

  [[ "$output" == "18" ]]
}

@test "lists IMO countries" {
  run_retry uv run -q --with=httpx --with=beautifulsoup4 python imo_countries.py

  [[ "$output" == *$'Albania\nLibya\n'* ]]
  [[ "$output" == *$'\nZimbabwe\nFaroes\n'* ]]
  [[ $(echo "$output" | wc -l) -gt 5 ]]
}

@test "lists IMO countries with a single selector" {
  run_retry uv run -q --with=httpx --with=beautifulsoup4 python imo_countries_single_selector.py

  [[ "$output" == *$'Albania\nLibya\n'* ]]
  [[ "$output" == *$'\nZimbabwe\nFaroes\n'* ]]
  [[ $(echo "$output" | wc -l) -gt 5 ]]
}

@test "lists Guardian F1 article titles" {
  run_retry uv run -q --with=httpx --with=beautifulsoup4 python guardian_f1_titles.py

  [[ "$output" == *' F1 '* ]]
  [[ $(echo "$output" | wc -l) -gt 5 ]]
}

@test "prints IKEA product dimensions and prices" {
  run_retry uv run -q --with=httpx --with=beautifulsoup4 python ikea_dimensions.py

  [[ "$output" == *'50 | 51 | 70'* ]]  # bestseller
  [[ "$output" == *'9 SEK'* ]]  # IKEA prices way too often end with 9
}

@test "prints IKEA product dimensions and prices using regex" {
  run_retry uv run -q --with=httpx --with=beautifulsoup4 python ikea_dimensions_regex.py

  [[ "$output" == *'50 | 51 | 70'* ]]  # bestseller
  [[ "$output" == *'9 SEK'* ]]  # IKEA prices way too often end with 9
}

@test "prints Guardian F1 titles with publish dates" {
  run_retry uv run -q --with=httpx --with=beautifulsoup4 python guardian_publish_dates.py

  [[ "$output" == *' F1 '* ]]
  [[ "$output" == *' | Mon '* ]]  # has info about date, Mondays are very likely
  [[ $(echo "$output" | wc -l) -gt 5 ]]
}

@test "filters products from JSON" {
  echo '[{"title":"Premium Speakers","min_price":75000,"price":75000},{"title":"Budget Headphones","min_price":25000,"price":25000}]' > products.json

  run_retry uv run python process_products_json.py

  [[ "$output" == "{'title': 'Premium Speakers', 'min_price': 75000, 'price': 75000}" ]]
}

@test "lists WTA player links" {
  run_retry uv run -q --with=httpx --with=beautifulsoup4 python wta_tennis_links.py

  [[ "$output" == *'https://www.wtatennis.com/players/'* ]]
  [[ $(echo "$output" | wc -l) -gt 10 ]]
}

@test "lists Guardian F1 article links" {
  run_retry uv run -q --with=httpx --with=beautifulsoup4 python guardian_f1_links.py

  [[ "$output" == *'https://www.theguardian.com/sport/'* ]]
  [[ $(echo "$output" | wc -l) -gt 5 ]]
}

@test "lists WTA player birthplaces" {
  run_retry uv run -q --with=httpx --with=beautifulsoup4 python wta_tennis_players.py

  [[ "$output" == *'https://www.wtatennis.com/players/'* ]]
  [[ "$output" == *' | '* ]]
  [[ "$output" == *', '* ]]
  [[ $(echo "$output" | wc -l) -eq 5 ]]
}

@test "lists Guardian F1 authors" {
  run_retry uv run -q --with=httpx --with=beautifulsoup4 python guardian_f1_authors.py

  [[ $(echo "$output" | wc -l) -gt 5 ]]
  [[ "$output" == *' F1 '* ]]
  [[ "$output" == *'Giles Richards: '* ]]  # writes most of them (we'll have to change this if they fire him)

  # check that each line is in the AUTHOR: TITLE format
  while IFS= read -r line; do
    [[ "$line" == *': '* ]]
    [[ "$line" != ': '* ]]
    [[ "$line" != *': ' ]]
  done <<< "$output"
}

@test "lists Python database jobs" {
  run_retry uv run -q --with=httpx --with=beautifulsoup4 python python_jobs_database.py

  [[ "$output" == *"'title': '"* ]]
  [[ "$output" == *"'company': '"* ]]
  [[ "$output" == *"'url': 'https://www.python.org/jobs/"* ]]
  [[ "$output" == *"'posted_on': datetime.date("* ]]
}

@test "counts total eurozone population" {
  run_retry uv run -q --with=httpx --with=beautifulsoup4 python eurozone_population.py

  [[ "$output" -gt 300000000 ]]
}

@test "scrapes F1 Academy driver details with Crawlee" {
  run_retry uv run -q --with=crawlee[beautifulsoup] python crawlee_f1_drivers.py

  (( status == 0 ))
  [[ -f dataset.json ]]
  [[ $(cat dataset.json | jq '. | length') -gt 6 ]]
  [[ $(cat dataset.json | jq -c '.[0] | keys') == '["dob","instagram_url","name","nationality","team","url"]' ]]
  [[ $(cat dataset.json | jq '.[].url') == *"https://www.f1academy.com/Racing-Series/Drivers/"* ]]
}

@test "scrapes Netflix user scores with Crawlee" {
  run_retry uv run -q --with=crawlee[beautifulsoup] python crawlee_netflix_ratings.py

  (( status == 0 ))
  [[ -f dataset.json ]]
  [[ $(cat dataset.json | jq '. | length') -eq 5 ]]
  [[ $(cat dataset.json | jq -c '.[0] | keys') == '["title","url","user_score"]' ]]
  [[ $(cat dataset.json | jq '.[].url') == *"https://www.themoviedb.org/"* ]]
}
