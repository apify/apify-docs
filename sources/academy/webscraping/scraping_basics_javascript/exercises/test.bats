setup_file() {
  cd "$BATS_TEST_DIRNAME"
  npm init --yes
  npm install cheerio crawlee
}

teardown() {
  rm -rf products.json storage dataset.json
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
  run node lego.mjs

  [[ "$output" == *"Millennium Falcon"* ]]
}

@test "counts the number of F1 Academy teams" {
  run node f1academy_teams.mjs

  [[ "$output" == "6" ]]
}

@test "counts the number of F1 Academy drivers" {
  run node f1academy_drivers.mjs

  [[ "$output" == "18" ]]
}

@test "lists IMO countries" {
  run node imo_countries.mjs

  [[ "$output" == *$'Albania\nLibya\n'* ]]
  [[ "$output" == *$'\nZimbabwe\nFaroes\n'* ]]
  [[ $(echo "$output" | wc -l) -gt 5 ]]
}

@test "lists IMO countries with a single selector" {
  run node imo_countries_single_selector.mjs

  [[ "$output" == *$'Albania\nLibya\n'* ]]
  [[ "$output" == *$'\nZimbabwe\nFaroes\n'* ]]
  [[ $(echo "$output" | wc -l) -gt 5 ]]
}

@test "lists Guardian F1 article titles" {
  run node guardian_f1_titles.mjs

  [[ "$output" == *' F1 '* ]]
  [[ $(echo "$output" | wc -l) -gt 5 ]]
}

@test "prints warehouse stock counts" {
  run node warehouse_units.mjs

  [[ "$output" == *$'JBL Flip 4 Waterproof Portable Bluetooth Speaker | 672\n'* ]]
  [[ "$output" == *$'Sony XBR-950G BRAVIA 4K HDR Ultra HD TV | 76\n'* ]]
  [[ $(echo "$output" | wc -l) -gt 5 ]]
}

@test "prints warehouse stock counts using regex" {
  run node warehouse_units_regex.mjs

  [[ "$output" == *$'JBL Flip 4 Waterproof Portable Bluetooth Speaker | 672\n'* ]]
  [[ "$output" == *$'Sony XBR-950G BRAVIA 4K HDR Ultra HD TV | 76\n'* ]]
  [[ $(echo "$output" | wc -l) -gt 5 ]]
}

@test "prints Guardian F1 titles with publish dates" {
  run node guardian_publish_dates.mjs

  [[ "$output" == *' F1 '* ]]
  [[ "$output" == *' | Mon '* ]]  # has info about date, Mondays are very likely
  [[ $(echo "$output" | wc -l) -gt 5 ]]
}

@test "filters products from JSON" {
  echo '[{"title":"Premium Speakers","minPrice":75000,"price":75000},{"title":"Budget Headphones","minPrice":25000,"price":25000}]' > products.json

  run node process_products_json.mjs

  [[ "$output" == "{ title: 'Premium Speakers', minPrice: 75000, price: 75000 }" ]]
}

@test "lists WTA player links" {
  run node wta_tennis_links.mjs

  [[ "$output" == *'https://www.wtatennis.com/players/'* ]]
  [[ $(echo "$output" | wc -l) -gt 10 ]]
}

@test "lists Guardian F1 article links" {
  run node guardian_f1_links.mjs

  [[ "$output" == *'https://www.theguardian.com/sport/'* ]]
  [[ $(echo "$output" | wc -l) -gt 5 ]]
}

@test "lists WTA player birthplaces" {
  run node wta_tennis_players.mjs

  [[ "$output" == *'https://www.wtatennis.com/players/'* ]]
  [[ "$output" == *' | '* ]]
  [[ "$output" == *', '* ]]
  [[ $(echo "$output" | wc -l) -eq 5 ]]
}

@test "lists Guardian F1 authors" {
  run node guardian_f1_authors.mjs

  [[ "$output" == *' F1 '* ]]
  [[ "$output" == *'Giles Richards: '* ]]  # writes most of them (we'll have to change this if they fire him)
  [[ "$output" == *'Guardian sport: '* || "$output" == *'PM Media: '* ]]
  [[ $(echo "$output" | wc -l) -gt 5 ]]
}

@test "lists JavaScript GitHub repos with the LLM topic" {
  run node js_llm_projects.mjs

  (( status == 0 ))
  [[ $(echo "$output" | wc -l) -eq 37 ]]
  [[ "$output" == *' name: '* ]]
  [[ "$output" == *' url: '* ]]
  [[ "$output" == *'https://github.com/'* ]]
  [[ "$output" == *' description: '* ]]
  [[ "$output" == *' stars: '* ]]
  [[ "$output" == *' updatedOn: '* ]]
}

@test "finds the shortest CNN sports article" {
  run node cnn_sports_shortest_article.mjs

  [[ "$output" == 'https://edition.cnn.com/'* ]]
}

@test "scrapes F1 Academy driver details with Crawlee" {
  run node crawlee_f1_drivers.mjs

  (( status == 0 ))
  [[ -f dataset.json ]]
  [[ $(cat dataset.json | jq '. | length') -gt 6 ]]
  [[ $(cat dataset.json | jq -c '.[0] | keys') == '["dob","instagram_url","name","nationality","team","url"]' ]]
  [[ $(cat dataset.json | jq '.[].url') == *"https://www.f1academy.com/Racing-Series/Drivers/"* ]]
}

@test "scrapes Netflix ratings with Crawlee" {
  run node crawlee_netflix_ratings.mjs

  (( status == 0 ))
  [[ -f dataset.json ]]
  [[ $(cat dataset.json | jq '. | length') == "5" ]]
  [[ $(cat dataset.json | jq -c '.[0] | keys') == '["rating","title","url"]' ]]
  [[ $(cat dataset.json | jq '.[].url') == *"https://www.imdb.com/title/"* ]]
}
