setup() {
  cd "$BATS_TEST_DIRNAME"
}

@test "outputs the HTML with Star Wars products" {
  run uv run --with httpx python lego.py
  [[ "$output" == *"Millennium Falcon"* ]]
}

@test "counts the number of F1 Academy teams" {
  run uv run --with httpx --with beautifulsoup4 python f1academy_teams.py
  (( status == 0 ))
  [[ -n "$output" ]]
}

@test "counts the number of F1 Academy drivers" {
  run uv run --with httpx --with beautifulsoup4 python f1academy_drivers.py
  (( status == 0 ))
  [[ -n "$output" ]]
}

@test "lists African countries" {
  run uv run --with httpx --with beautifulsoup4 python wikipedia_countries.py
  (( status == 0 ))
  [[ -n "$output" ]]
}

@test "lists African countries with a single selector" {
  run uv run --with httpx --with beautifulsoup4 python wikipedia_countries_single_selector.py
  (( status == 0 ))
  [[ -n "$output" ]]
}

@test "lists Guardian F1 article titles" {
  run uv run --with httpx --with beautifulsoup4 python guardian_f1_titles.py
  (( status == 0 ))
  [[ -n "$output" ]]
}

@test "prints warehouse stock counts" {
  run uv run --with httpx --with beautifulsoup4 python warehouse_units.py
  (( status == 0 ))
  [[ -n "$output" ]]
}

@test "prints warehouse stock counts using regex" {
  run uv run --with httpx --with beautifulsoup4 python warehouse_units_regex.py
  (( status == 0 ))
  [[ -n "$output" ]]
}

@test "prints Guardian F1 titles with publish dates" {
  run uv run --with httpx --with beautifulsoup4 python guardian_publish_dates.py
  (( status == 0 ))
  [[ -n "$output" ]]
}

@test "filters products from JSON" {
  run uv run python process_products_json.py
  (( status == 0 ))
  [[ -n "$output" ]]
}

@test "lists Wikipedia country links" {
  run uv run --with httpx --with beautifulsoup4 python wikipedia_country_links.py
  (( status == 0 ))
  [[ -n "$output" ]]
}

@test "lists Guardian F1 article links" {
  run uv run --with httpx --with beautifulsoup4 python guardian_f1_links.py
  (( status == 0 ))
  [[ -n "$output" ]]
}

@test "prints Wikipedia calling codes" {
  run uv run --with httpx --with beautifulsoup4 python wikipedia_calling_codes.py
  (( status == 0 ))
  [[ -n "$output" ]]
}

@test "lists Guardian F1 authors" {
  run uv run --with httpx --with beautifulsoup4 python guardian_f1_authors.py
  (( status == 0 ))
  [[ -n "$output" ]]
}

@test "lists Python database jobs" {
  run uv run --with httpx --with beautifulsoup4 python python_jobs_database.py
  (( status == 0 ))
  [[ -n "$output" ]]
}

@test "finds the shortest CNN sports article" {
  run uv run --with httpx --with beautifulsoup4 python cnn_sports_shortest_article.py
  (( status == 0 ))
  [[ -n "$output" ]]
}

@test "scrapes F1 Academy driver details with Crawlee" {
  run uv run --with httpx --with beautifulsoup4 --with crawlee python crawlee_f1_drivers.py
  (( status == 0 ))
  [[ -n "$output" || -f dataset.json ]]
  rm -f dataset.json
}

@test "scrapes Netflix ratings with Crawlee" {
  run uv run --with httpx --with beautifulsoup4 --with crawlee python crawlee_netflix_ratings.py
  (( status == 0 ))
  [[ -n "$output" || -f dataset.json ]]
  rm -f dataset.json
}
