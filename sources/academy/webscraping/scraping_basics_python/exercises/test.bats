setup_file() {
  cd "$BATS_TEST_DIRNAME"
}

teardown() {
  rm -rf products.json storage dataset.json
}

@test "outputs the HTML with Star Wars products" {
  run uv run --with=httpx python lego.py

  [[ "$output" == *"Millennium Falcon"* ]]
}

@test "counts the number of F1 Academy teams" {
  run uv run --with=httpx --with=beautifulsoup4 python f1academy_teams.py

  [[ "$output" == "6" ]]
}

@test "counts the number of F1 Academy drivers" {
  run uv run --with=httpx --with=beautifulsoup4 python f1academy_drivers.py

  [[ "$output" == "18" ]]
}

@test "lists African countries" {
  run uv run --with=httpx --with=beautifulsoup4 python wikipedia_countries.py

  [[ "$output" == *$'Comoros\nDemocratic Republic of the Congo\n'* ]]
  [[ $(echo "$output" | wc -l) -gt 5 ]]
}

@test "lists African countries with a single selector" {
  run uv run --with=httpx --with=beautifulsoup4 python wikipedia_countries_single_selector.py

  [[ "$output" == *$'Comoros\nDemocratic Republic of the Congo\n'* ]]
  [[ $(echo "$output" | wc -l) -gt 5 ]]
}

@test "lists Guardian F1 article titles" {
  run uv run --with=httpx --with=beautifulsoup4 python guardian_f1_titles.py

  [[ "$output" == *' F1 '* ]]
  [[ $(echo "$output" | wc -l) -gt 5 ]]
}

@test "prints warehouse stock counts" {
  run uv run --with=httpx --with=beautifulsoup4 python warehouse_units.py

  [[ "$output" == *$'JBL Flip 4 Waterproof Portable Bluetooth Speaker | 672\n'* ]]
  [[ "$output" == *$'Sony XBR-950G BRAVIA 4K HDR Ultra HD TV | 77\n'* ]]
  [[ $(echo "$output" | wc -l) -gt 5 ]]
}

@test "prints warehouse stock counts using regex" {
  run uv run --with=httpx --with=beautifulsoup4 python warehouse_units_regex.py

  [[ "$output" == *$'JBL Flip 4 Waterproof Portable Bluetooth Speaker | 672\n'* ]]
  [[ "$output" == *$'Sony XBR-950G BRAVIA 4K HDR Ultra HD TV | 77\n'* ]]
  [[ $(echo "$output" | wc -l) -gt 5 ]]
}

@test "prints Guardian F1 titles with publish dates" {
  run uv run --with=httpx --with=beautifulsoup4 python guardian_publish_dates.py

  [[ "$output" == *' F1 '* ]]
  [[ "$output" == *' | Sun '* ]]  # has info about date, Sundays are very likely
  [[ $(echo "$output" | wc -l) -gt 5 ]]
}

@test "filters products from JSON" {
  echo '[{"title":"Premium Speakers","min_price":75000,"price":75000},{"title":"Budget Headphones","min_price":25000,"price":25000}]' > products.json

  run uv run python process_products_json.py

  [[ "$output" == "{'title': 'Premium Speakers', 'min_price': 75000, 'price': 75000}" ]]
}

@test "lists Wikipedia country links" {
  run uv run --with=httpx --with=beautifulsoup4 python wikipedia_country_links.py

  [[ "$output" == *$'https://en.wikipedia.org/wiki/Algeria\nhttps://en.wikipedia.org/wiki/Angola\n'* ]]
  [[ "$output" == *$'https://en.wikipedia.org/wiki/R%C3%A9union\n'* ]]
  [[ $(echo "$output" | wc -l) -gt 5 ]]
}

@test "lists Guardian F1 article links" {
  run uv run --with=httpx --with=beautifulsoup4 python guardian_f1_links.py

  [[ "$output" == *'https://www.theguardian.com/sport/'* ]]
  [[ $(echo "$output" | wc -l) -gt 5 ]]
}

@test "prints Wikipedia calling codes" {
  run uv run --with=httpx --with=beautifulsoup4 python wikipedia_calling_codes.py

  [[ "$output" == *$'https://en.wikipedia.org/wiki/Comoros +269\n'* ]]
  [[ "$output" == *$'https://en.wikipedia.org/wiki/Sahrawi_Arab_Democratic_Republic null\n'* ]]
  [[ $(echo "$output" | wc -l) -gt 5 ]]
}

@test "lists Guardian F1 authors" {
  run uv run --with=httpx --with=beautifulsoup4 python guardian_f1_authors.py

  [[ "$output" == *' F1 '* ]]
  [[ "$output" == *'Giles Richards: '* ]]  # writes most of them (we'll have to change this if they fire him)
  [[ "$output" == *'Guardian sport: '* || "$output" == *'PM Media: '* ]]
  [[ $(echo "$output" | wc -l) -gt 5 ]]
}

@test "lists Python database jobs" {
  run uv run --with=httpx --with=beautifulsoup4 python python_jobs_database.py

  [[ "$output" == *"'title': '"* ]]
  [[ "$output" == *"'company': '"* ]]
  [[ "$output" == *"'url': 'https://www.python.org/jobs/"* ]]
  [[ "$output" == *"'posted_on': datetime.date("* ]]
}

@test "finds the shortest CNN sports article" {
  run uv run --with=httpx --with=beautifulsoup4 python cnn_sports_shortest_article.py

  [[ "$output" == 'https://edition.cnn.com/'* ]]
}

@test "scrapes F1 Academy driver details with Crawlee" {
  run uv run --with=crawlee[beautifulsoup] python crawlee_f1_drivers.py

  (( status == 0 ))
  [[ -f dataset.json ]]
  [[ $(cat dataset.json | jq '. | length') == "18" ]]
  [[ $(cat dataset.json | jq -c '.[0] | keys') == '["dob","instagram_url","name","nationality","team","url"]' ]]
  [[ $(cat dataset.json | jq '.[].url') == *"https://www.f1academy.com/Racing-Series/Drivers/"* ]]
}

@test "scrapes Netflix ratings with Crawlee" {
  run uv run --with=crawlee[beautifulsoup] python crawlee_netflix_ratings.py

  (( status == 0 ))
  [[ -f dataset.json ]]
  [[ $(cat dataset.json | jq '. | length') == "10" ]]
  [[ $(cat dataset.json | jq -c '.[0] | keys') == '["rating","title","url"]' ]]
  [[ $(cat dataset.json | jq '.[].url') == *"https://www.imdb.com/title/"* ]]
}
