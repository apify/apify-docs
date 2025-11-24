setup() {
  DIR=sources/academy/webscraping/scraping_basics_javascript/exercises
}

@test "outputs the HTML with Star Wars products" {
  run npx node "$DIR/scrape_lego.mjs"
  [[ "$output" == *"Millennium Falcon"* ]]
}

@test "outputs the number of F1 Academy teams" {
  run npx --package=cheerio node "$DIR/scrape_f1academy_teams.mjs"
  [[ "$output" == "6" ]]
}
