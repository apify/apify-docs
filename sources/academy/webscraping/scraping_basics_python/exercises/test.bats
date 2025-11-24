setup() {
  DIR=sources/academy/webscraping/scraping_basics_python/exercises
}

@test "outputs the HTML with Star Wars products" {
  run uv run --with httpx python "$DIR/lego.py"
  [[ "$output" == *"Millennium Falcon"* ]]
}
