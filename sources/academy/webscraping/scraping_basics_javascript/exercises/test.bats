@test "outputs the HTML with Star Wars products" {
  run npx node "$BATS_TEST_DIRNAME/lego.mjs"
  [[ "$output" == *"Millennium Falcon"* ]]
}

@test "outputs the number of F1 Academy teams" {
  run npx --package=cheerio node "$BATS_TEST_DIRNAME/f1academy_teams.mjs"
  [[ "$output" == "6" ]]
}
