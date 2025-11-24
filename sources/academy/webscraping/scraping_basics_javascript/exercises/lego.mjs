const url = "https://www.lego.com/en-us/themes/star-wars";
const response = await fetch(url);

if (response.ok) {
  console.log(await response.text());
} else {
  throw new Error(`HTTP ${response.status}`);
}
