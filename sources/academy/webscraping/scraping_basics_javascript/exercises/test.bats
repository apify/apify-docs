setup_file() {
  cd "$BATS_TEST_DIRNAME"
  echo '{"name":"exercises","private":true}' > package.json
  npm install cheerio crawlee
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

teardown_file() {
  rm -rf node_modules package.json package-lock.json
}

@test "covers all exercise scripts" {
  local missing
  missing=0

  for file in *.mjs; do
    if ! grep -q "node $file" test.bats; then
      echo "Missing test for $file"
      missing=1
    fi
  done

  [[ $missing -eq 0 ]]
}

@test "outputs the HTML with Star Wars products" {
  run_retry node lego.mjs

  [[ "$output" == *"Millennium Falcon"* ]]
}

@test "counts the number of F1 Academy teams" {
  run_retry node f1academy_teams.mjs

  [[ "$output" == "6" ]]
}

@test "counts the number of F1 Academy drivers" {
  run_retry node f1academy_drivers.mjs

  [[ "$output" == "18" ]]
}

@test "lists IMO countries" {
  run_retry node imo_countries.mjs

  [[ "$output" == *$'Albania\nLibya\n'* ]]
  [[ "$output" == *$'\nZimbabwe\nFaroes\n'* ]]
  [[ $(echo "$output" | wc -l) -gt 5 ]]
}

@test "lists IMO countries with a single selector" {
  run_retry node imo_countries_single_selector.mjs

  [[ "$output" == *$'Albania\nLibya\n'* ]]
  [[ "$output" == *$'\nZimbabwe\nFaroes\n'* ]]
  [[ $(echo "$output" | wc -l) -gt 5 ]]
}

@test "lists Guardian F1 article titles" {
  run_retry node guardian_f1_titles.mjs

  [[ "$output" == *' F1 '* ]]
  [[ $(echo "$output" | wc -l) -gt 5 ]]
}

@test "prints IKEA product dimensions and prices" {
  run_retry node ikea_dimensions.mjs

  [[ "$output" == *'50 | 51 | 70'* ]]  # bestseller
  [[ "$output" == *'9 SEK'* ]]  # IKEA prices way too often end with 9
}

@test "prints IKEA product dimensions and prices using regex" {
  run_retry node ikea_dimensions_regex.mjs

  [[ "$output" == *'50 | 51 | 70'* ]]  # bestseller
  [[ "$output" == *'9 SEK'* ]]  # IKEA prices way too often end with 9
}

@test "prints Guardian F1 titles with publish dates" {
  run_retry node guardian_publish_dates.mjs

  [[ "$output" == *' F1 '* ]]
  [[ "$output" == *' | Mon '* ]]  # has info about date, Mondays are very likely
  [[ $(echo "$output" | wc -l) -gt 5 ]]
}

@test "filters products from JSON" {
  echo '[{"title":"Premium Speakers","minPrice":75000,"price":75000},{"title":"Budget Headphones","minPrice":25000,"price":25000}]' > products.json

  run_retry node process_products_json.mjs

  [[ "$output" == "{ title: 'Premium Speakers', minPrice: 75000, price: 75000 }" ]]
}

@test "lists WTA player links" {
  run_retry node wta_tennis_links.mjs

  [[ "$output" == *'https://www.wtatennis.com/players/'* ]]
  [[ $(echo "$output" | wc -l) -gt 10 ]]
}

@test "lists Guardian F1 article links" {
  run_retry node guardian_f1_links.mjs

  [[ "$output" == *'https://www.theguardian.com/sport/'* ]]
  [[ $(echo "$output" | wc -l) -gt 5 ]]
}

@test "lists WTA player birthplaces" {
  run_retry node wta_tennis_players.mjs

  [[ "$output" == *'https://www.wtatennis.com/players/'* ]]
  [[ "$output" == *' | '* ]]
  [[ "$output" == *', '* ]]
  [[ $(echo "$output" | wc -l) -eq 5 ]]
}

@test "lists Guardian F1 authors" {
  run_retry node guardian_f1_authors.mjs

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

@test "lists JavaScript GitHub repos with the LLM topic" {
  run_retry node js_llm_projects.mjs

  (( status == 0 ))
  [[ $(echo "$output" | wc -l) -eq 37 ]]
  [[ "$output" == *' name: '* ]]
  [[ "$output" == *' url: '* ]]
  [[ "$output" == *'https://github.com/'* ]]
  [[ "$output" == *' description: '* ]]
  [[ "$output" == *' stars: '* ]]
  [[ "$output" == *' updatedOn: '* ]]
}

@test "counts total eurozone population" {
  run_retry node eurozone_population.mjs

  [[ "$output" -gt 300000000 ]]
}

@test "scrapes F1 Academy driver details with Crawlee" {
  run_retry node crawlee_f1_drivers.mjs

  (( status == 0 ))
  [[ -f dataset.json ]]
  [[ $(cat dataset.json | jq '. | length') -gt 6 ]]
  [[ $(cat dataset.json | jq -c '.[0] | keys') == '["dob","instagram_url","name","nationality","team","url"]' ]]
  [[ $(cat dataset.json | jq '.[].url') == *"https://www.f1academy.com/Racing-Series/Drivers/"* ]]
}

@test "scrapes Netflix user scores with Crawlee" {
  run_retry node crawlee_netflix_ratings.mjs

  (( status == 0 ))
  [[ -f dataset.json ]]
  [[ $(cat dataset.json | jq '. | length') == "5" ]]
  [[ $(cat dataset.json | jq -c '.[0] | keys') == '["title","url","user_score"]' ]]
  [[ $(cat dataset.json | jq '.[].url') == *"https://www.themoviedb.org/"* ]]
}
