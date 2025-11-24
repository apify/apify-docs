@test "outputs the HTML with Star Wars products" {
  run uv run --with httpx python "$BATS_TEST_DIRNAME/lego.py"
  [[ "$output" == *"Millennium Falcon"* ]]
}
