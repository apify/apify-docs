setup() {
  cd "$BATS_TEST_DIRNAME"
  export npm_config_yes=true
}

retry_run() {
  for attempt in 1 2 3; do
    run "$@"
    (( status == 0 )) && return 0
    sleep 1
  done
  return "$status"
}

@test "outputs the HTML with Star Wars products" {
  run npx node lego.mjs
  [[ "$output" == *"Millennium Falcon"* ]]
}

@test "counts the number of F1 Academy teams" {
  run npx --package=cheerio node f1academy_teams.mjs
  [[ "$output" == "6" ]]
}

@test "counts the number of F1 Academy drivers" {
  run npx --package=cheerio node f1academy_drivers.mjs
  [[ "$output" == "18" ]]
}

@test "lists African countries" {
  run npx --package=cheerio node wikipedia_countries.mjs
  [[ "$output" == *$'Comoros\nDemocratic Republic of the Congo\n'* ]]
  [[ $(echo "$output" | wc -l) -gt 5 ]]
}

@test "lists African countries with a single selector" {
  run npx --package=cheerio node wikipedia_countries_single_selector.mjs
  [[ "$output" == *$'Comoros\nDemocratic Republic of the Congo\n'* ]]
  [[ $(echo "$output" | wc -l) -gt 5 ]]
}

@test "lists Guardian F1 article titles" {
  run npx --package=cheerio node guardian_f1_titles.mjs
  [[ "$output" == *' F1 '* ]]
  [[ $(echo "$output" | wc -l) -gt 5 ]]
}

@test "prints warehouse stock counts" {
  run npx --package=cheerio node warehouse_units.mjs
  [[ "$output" == *$'JBL Flip 4 Waterproof Portable Bluetooth Speaker | 672\n'* ]]
  [[ "$output" == *$'Sony XBR-950G BRAVIA 4K HDR Ultra HD TV | 77\n'* ]]
  [[ $(echo "$output" | wc -l) -gt 5 ]]
}

@test "prints warehouse stock counts using regex" {
  run npx --package=cheerio node warehouse_units_regex.mjs
  [[ "$output" == *$'JBL Flip 4 Waterproof Portable Bluetooth Speaker | 672\n'* ]]
  [[ "$output" == *$'Sony XBR-950G BRAVIA 4K HDR Ultra HD TV | 77\n'* ]]
  [[ $(echo "$output" | wc -l) -gt 5 ]]
}

@test "prints Guardian F1 titles with publish dates" {
  run npx --package=cheerio node guardian_publish_dates.mjs
  [[ "$output" == *' F1 '* ]]
  [[ "$output" == *' | Sun '* ]]  # has info about date (articles published on Sunday are very likely)
  [[ $(echo "$output" | wc -l) -gt 5 ]]
}

@test "filters products from JSON" {
  run npx node process_products_json.mjs
  [[ "$output" == "{ title: 'Premium Speakers', minPrice: 75000, price: 75000 }" ]]
}

@test "lists Wikipedia country links" {
  run npx --package=cheerio node wikipedia_country_links.mjs
  [[ "$output" == *$'https://en.wikipedia.org/wiki/Algeria\nhttps://en.wikipedia.org/wiki/Angola\n'* ]]
  [[ "$output" == *$'https://en.wikipedia.org/wiki/R%C3%A9union\n'* ]]
  [[ $(echo "$output" | wc -l) -gt 5 ]]
}

@test "lists Guardian F1 article links" {
  run npx --package=cheerio node guardian_f1_links.mjs
  [[ "$output" == *'https://www.theguardian.com/sport/'* ]]
  [[ $(echo "$output" | wc -l) -gt 5 ]]
}

@test "prints Wikipedia calling codes" {
  run npx --package=cheerio node wikipedia_calling_codes.mjs
  [[ "$output" == *$'https://en.wikipedia.org/wiki/Comoros +269\n'* ]]
  [[ "$output" == *$'https://en.wikipedia.org/wiki/Sahrawi_Arab_Democratic_Republic null\n'* ]]
  [[ $(echo "$output" | wc -l) -gt 5 ]]
}

@test "lists Guardian F1 authors" {
  run npx --package=cheerio node guardian_f1_authors.mjs
  [[ "$output" == *' F1 '* ]]
  [[ "$output" == *'Giles Richards: '* ]]  # writes most of them (we'll have to change this if they fire'him)
  [[ "$output" == *'Guardian sport: '* || "$output" == *'PM Media: '* ]]
  [[ $(echo "$output" | wc -l) -gt 5 ]]
}

@test "lists npm LLM packages" {
  run npx --package=cheerio node npm_llm_packages.mjs
  (( status == 0 ))
  [[ -n "$output" ]]
}

@test "finds the shortest CNN sports article" {
  run npx --package=cheerio node cnn_sports_shortest_article.mjs
  [[ "$output" == 'https://edition.cnn.com/'* ]]
}

@test "scrapes F1 Academy driver details with Crawlee" {
  run npx --package=crawlee node crawlee_f1_drivers.mjs
  (( status == 0 ))
  [[ -n "$output" || -f dataset.json ]]
  rm -f dataset.json
}

@test "scrapes Netflix ratings with Crawlee" {
  run npx --package=crawlee node crawlee_netflix_ratings.mjs
  (( status == 0 ))
  [[ -n "$output" || -f dataset.json ]]
  rm -f dataset.json
}
