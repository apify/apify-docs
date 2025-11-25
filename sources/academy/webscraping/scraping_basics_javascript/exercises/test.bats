setup() {
  cd "$BATS_TEST_DIRNAME"
  export npm_config_yes=true
}

@test "outputs the HTML with Star Wars products" {
  run npx node lego.mjs
  [[ "$output" == *"Millennium Falcon"* ]]
}

@test "counts the number of F1 Academy teams" {
  run npx --package=cheerio node f1academy_teams.mjs
  (( status == 0 ))
  [[ -n "$output" ]]
}

@test "counts the number of F1 Academy drivers" {
  run npx --package=cheerio node f1academy_drivers.mjs
  (( status == 0 ))
  [[ -n "$output" ]]
}

@test "lists African countries" {
  run npx --package=cheerio node wikipedia_countries.mjs
  (( status == 0 ))
  [[ -n "$output" ]]
}

@test "lists African countries with a single selector" {
  run npx --package=cheerio node wikipedia_countries_single_selector.mjs
  (( status == 0 ))
  [[ -n "$output" ]]
}

@test "lists Guardian F1 article titles" {
  run npx --package=cheerio node guardian_f1_titles.mjs
  (( status == 0 ))
  [[ -n "$output" ]]
}

@test "prints warehouse stock counts" {
  run npx --package=cheerio node warehouse_units.mjs
  (( status == 0 ))
  [[ -n "$output" ]]
}

@test "prints warehouse stock counts using regex" {
  run npx --package=cheerio node warehouse_units_regex.mjs
  (( status == 0 ))
  [[ -n "$output" ]]
}

@test "prints Guardian F1 titles with publish dates" {
  run npx --package=cheerio node guardian_publish_dates.mjs
  (( status == 0 ))
  [[ -n "$output" ]]
}

@test "filters products from JSON" {
  run npx node process_products_json.mjs
  (( status == 0 ))
  [[ -n "$output" ]]
}

@test "lists Wikipedia country links" {
  run npx --package=cheerio node wikipedia_country_links.mjs
  (( status == 0 ))
  [[ -n "$output" ]]
}

@test "lists Guardian F1 article links" {
  run npx --package=cheerio node guardian_f1_links.mjs
  (( status == 0 ))
  [[ -n "$output" ]]
}

@test "prints Wikipedia calling codes" {
  run npx --package=cheerio node wikipedia_calling_codes.mjs
  (( status == 0 ))
  [[ -n "$output" ]]
}

@test "lists Guardian F1 authors" {
  run npx --package=cheerio node guardian_f1_authors.mjs
  (( status == 0 ))
  [[ -n "$output" ]]
}

@test "lists npm LLM packages" {
  run npx --package=cheerio node npm_llm_packages.mjs
  (( status == 0 ))
  [[ -n "$output" ]]
}

@test "finds the shortest CNN sports article" {
  run npx --package=cheerio node cnn_sports_shortest_article.mjs
  (( status == 0 ))
  [[ -n "$output" ]]
}

@test "scrapes F1 Academy driver details with Crawlee" {
  run npx --package=crawlee node crawlee_f1_drivers.mjs
  [[ -n "$output" || -f dataset.json ]]
  rm -f dataset.json
}

@test "scrapes Netflix ratings with Crawlee" {
  run npx --package=crawlee node crawlee_netflix_ratings.mjs
  [[ -n "$output" || -f dataset.json ]]
  rm -f dataset.json
}
