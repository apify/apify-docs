import httpx
from bs4 import BeautifulSoup


def parse_dimensions(text):
    words = text.strip().split()
    if words and words[-1] == "cm":
        dimensions = words[-2].split("x")
        if len(dimensions) == 3:
            return dimensions
    return None


url = "https://www.ikea.com/se/en/cat/jonaxel-system-45730/"
response = httpx.get(url)
response.raise_for_status()

soup = BeautifulSoup(response.text, "html.parser")

for product in soup.select(".plp-mastercard"):
    description_text = product.select_one(".plp-text").text
    if dimensions := parse_dimensions(description_text):
        price = product.select_one(".plp-price__integer").text.replace(" ", "").strip()
        print(f"{dimensions[0]} | {dimensions[1]} | {dimensions[2]} ... {price} SEK")
