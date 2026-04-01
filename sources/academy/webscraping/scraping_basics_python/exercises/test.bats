setup_file() {
  cd "$BATS_TEST_DIRNAME"
}

teardown() {
  rm -rf products.json storage dataset.json
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
  run uv run -q --with=httpx python lego.py

  [[ "$output" == *"Millennium Falcon"* ]]
}

@test "counts the number of F1 Academy teams" {
  run uv run -q --with=httpx --with=beautifulsoup4 python f1academy_teams.py

  [[ "$output" == "6" ]]
}

@test "counts the number of F1 Academy drivers" {
  run uv run -q --with=httpx --with=beautifulsoup4 python f1academy_drivers.py

  [[ "$output" == "18" ]]
}

@test "lists IMO countries" {
  run uv run -q --with=httpx --with=beautifulsoup4 python imo_countries.py

  [[ "$output" == *$'Albania\nLibya\n'* ]]
  [[ "$output" == *$'\nZimbabwe\nFaroes\n'* ]]
  [[ $(echo "$output" | wc -l) -gt 5 ]]
}

@test "lists IMO countries with a single selector" {
  run uv run -q --with=httpx --with=beautifulsoup4 python imo_countries_single_selector.py

  [[ "$output" == *$'Albania\nLibya\n'* ]]
  [[ "$output" == *$'\nZimbabwe\nFaroes\n'* ]]
  [[ $(echo "$output" | wc -l) -gt 5 ]]
}

@test "lists Guardian F1 article titles" {
  run uv run -q --with=httpx --with=beautifulsoup4 python guardian_f1_titles.py

  [[ "$output" == *' F1 '* ]]
  [[ $(echo "$output" | wc -l) -gt 5 ]]
}

@test "prints warehouse stock counts" {
  run uv run -q --with=httpx --with=beautifulsoup4 python warehouse_units.py

  [[ "$output" == *$'JBL Flip 4 Waterproof Portable Bluetooth Speaker | 672\n'* ]]
  [[ "$output" == *$'Sony XBR-950G BRAVIA 4K HDR Ultra HD TV | 76\n'* ]]
  [[ $(echo "$output" | wc -l) -gt 5 ]]
}

@test "prints warehouse stock counts using regex" {
  run uv run -q --with=httpx --with=beautifulsoup4 python warehouse_units_regex.py

  [[ "$output" == *$'JBL Flip 4 Waterproof Portable Bluetooth Speaker | 672\n'* ]]
  [[ "$output" == *$'Sony XBR-950G BRAVIA 4K HDR Ultra HD TV | 76\n'* ]]
  [[ $(echo "$output" | wc -l) -gt 5 ]]
}

@test "prints Guardian F1 titles with publish dates" {
  run uv run -q --with=httpx --with=beautifulsoup4 python guardian_publish_dates.py

  [[ "$output" == *' F1 '* ]]
  [[ "$output" == *' | Mon '* ]]  # has info about date, Mondays are very likely
  [[ $(echo "$output" | wc -l) -gt 5 ]]
}

@test "filters products from JSON" {
  echo '[{"title":"Premium Speakers","min_price":75000,"price":75000},{"title":"Budget Headphones","min_price":25000,"price":25000}]' > products.json

  run uv run python process_products_json.py

  [[ "$output" == "{'title': 'Premium Speakers', 'min_price': 75000, 'price': 75000}" ]]
}

@test "lists WTA player links" {
  run uv run -q --with=httpx --with=beautifulsoup4 python wta_tennis_links.py

  [[ "$output" == *'https://www.wtatennis.com/players/'* ]]
  [[ $(echo "$output" | wc -l) -gt 10 ]]
}

@test "lists Guardian F1 article links" {
  run uv run -q --with=httpx --with=beautifulsoup4 python guardian_f1_links.py

  [[ "$output" == *'https://www.theguardian.com/sport/'* ]]
  [[ $(echo "$output" | wc -l) -gt 5 ]]
}

@test "lists WTA player birthplaces" {
  run uv run -q --with=httpx --with=beautifulsoup4 python wta_tennis_players.py

  [[ "$output" == *'https://www.wtatennis.com/players/'* ]]
  [[ "$output" == *' | '* ]]
  [[ "$output" == *', '* ]]
  [[ $(echo "$output" | wc -l) -eq 5 ]]
}

@test "lists Guardian F1 authors" {
  run uv run -q --with=httpx --with=beautifulsoup4 python guardian_f1_authors.py

  [[ "$output" == *' F1 '* ]]
  [[ "$output" == *'Giles Richards: '* ]]  # writes most of them (we'll have to change this if they fire him)
  [[ "$output" == *'Guardian sport: '* || "$output" == *'PM Media: '* ]]
  [[ $(echo "$output" | wc -l) -gt 5 ]]
}

@test "lists Python database jobs" {
  run uv run -q --with=httpx --with=beautifulsoup4 python python_jobs_database.py

  [[ "$output" == *"'title': '"* ]]
  [[ "$output" == *"'company': '"* ]]
  [[ "$output" == *"'url': 'https://www.python.org/jobs/"* ]]
  [[ "$output" == *"'posted_on': datetime.date("* ]]
}

@test "counts total eurozone population" {
  run uv run -q --with=httpx --with=beautifulsoup4 python eurozone_population.py

  [[ "$output" -gt 300000000 ]]
}

@test "scrapes F1 Academy driver details with Crawlee" {
  run uv run -q --with=crawlee[beautifulsoup] python crawlee_f1_drivers.py

  (( status == 0 ))
  [[ -f dataset.json ]]
  [[ $(cat dataset.json | jq '. | length') -gt 6 ]]
  [[ $(cat dataset.json | jq -c '.[0] | keys') == '["dob","instagram_url","name","nationality","team","url"]' ]]
  [[ $(cat dataset.json | jq '.[].url') == *"https://www.f1academy.com/Racing-Series/Drivers/"* ]]
}

@test "scrapes Netflix ratings with Crawlee" {
  run uv run -q --with=crawlee[beautifulsoup] python crawlee_netflix_ratings.py

  (( status == 0 ))
  [[ -f dataset.json ]]
  [[ $(cat dataset.json | jq '. | length') -eq 5 ]]
  [[ $(cat dataset.json | jq -c '.[0] | keys') == '["rating","title","url"]' ]]
  [[ $(cat dataset.json | jq '.[].url') == *"https://www.imdb.com/title/"* ]]
}
