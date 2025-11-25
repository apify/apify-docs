setup() {
  cd "$BATS_TEST_DIRNAME"
}

@test "outputs the HTML with Star Wars products" {
  run npx --yes node lego.mjs
  [[ "$output" == *"Millennium Falcon"* ]]
}

@test "counts the number of F1 Academy teams" {
  run npx --yes --package=cheerio node f1academy_teams.mjs
  (( status == 0 ))
  [[ -n "$output" ]]
}

@test "counts the number of F1 Academy drivers" {
  run npx --yes --package=cheerio node f1academy_drivers.mjs
  (( status == 0 ))
  [[ -n "$output" ]]
}

@test "lists African countries" {
  run npx --yes --package=cheerio node wikipedia_countries.mjs
  (( status == 0 ))
  [[ -n "$output" ]]
}

@test "lists African countries with a single selector" {
  run npx --yes --package=cheerio node wikipedia_countries_single_selector.mjs
  (( status == 0 ))
  [[ -n "$output" ]]
}

@test "lists Guardian F1 article titles" {
  run npx --yes --package=cheerio node guardian_f1_titles.mjs
  (( status == 0 ))
  [[ -n "$output" ]]
}

@test "prints warehouse stock counts" {
  run npx --yes --package=cheerio node warehouse_units.mjs
  (( status == 0 ))
  [[ -n "$output" ]]
}

@test "prints warehouse stock counts using regex" {
  run npx --yes --package=cheerio node warehouse_units_regex.mjs
  (( status == 0 ))
  [[ -n "$output" ]]
}

@test "prints Guardian F1 titles with publish dates" {
  run npx --yes --package=cheerio node guardian_publish_dates.mjs
  (( status == 0 ))
  [[ -n "$output" ]]
}

@test "filters products from JSON" {
  run npx --yes node process_products_json.mjs
  (( status == 0 ))
  [[ -n "$output" ]]
}

@test "lists Wikipedia country links" {
  run npx --yes --package=cheerio node wikipedia_country_links.mjs
  (( status == 0 ))
  [[ -n "$output" ]]
}

@test "lists Guardian F1 article links" {
  run npx --yes --package=cheerio node guardian_f1_links.mjs
  (( status == 0 ))
  [[ -n "$output" ]]
}

@test "prints Wikipedia calling codes" {
  run npx --yes --package=cheerio node wikipedia_calling_codes.mjs
  (( status == 0 ))
  [[ -n "$output" ]]
}

@test "lists Guardian F1 authors" {
  run npx --yes --package=cheerio node guardian_f1_authors.mjs
  (( status == 0 ))
  [[ -n "$output" ]]
}

@test "lists npm LLM packages" {
  run npx --yes --package=cheerio node npm_llm_packages.mjs
  (( status == 0 ))
  [[ -n "$output" ]]
}

@test "finds the shortest CNN sports article" {
  run npx --yes --package=cheerio node cnn_sports_shortest_article.mjs
  (( status == 0 ))
  [[ -n "$output" ]]
}

@test "scrapes F1 Academy driver details with Crawlee" {
  run npx --yes --package=crawlee --package=cheerio node crawlee_f1_drivers.mjs
  (( status == 0 ))
  [[ -n "$output" || -f dataset.json ]]
  rm -f dataset.json
}

@test "scrapes Netflix ratings with Crawlee" {
  run npx --yes --package=crawlee --package=cheerio node crawlee_netflix_ratings.mjs
  (( status == 0 ))
  [[ -n "$output" || -f dataset.json ]]
  rm -f dataset.json
}
