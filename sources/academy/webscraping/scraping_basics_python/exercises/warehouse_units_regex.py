import re

import httpx
from bs4 import BeautifulSoup

url = "https://warehouse-theme-metal.myshopify.com/collections/sales"
response = httpx.get(url)
response.raise_for_status()

soup = BeautifulSoup(response.text, "html.parser")

for product in soup.select('.product-item'):
    title = product.select_one('.product-item__title').text.strip()

    units_text = product.select_one('.product-item__inventory').text
    match = re.search(r"\d+", units_text)
    units = int(match.group()) if match else 0

    print(f"{title} | {units}")
