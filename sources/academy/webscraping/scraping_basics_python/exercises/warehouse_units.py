import httpx
from bs4 import BeautifulSoup

url = "https://warehouse-theme-metal.myshopify.com/collections/sales"
response = httpx.get(url)
response.raise_for_status()

soup = BeautifulSoup(response.text, "html.parser")

for product in soup.select('.product-item'):
    title = product.select_one('.product-item__title').text.strip()

    units_text = (
        product.select_one('.product-item__inventory').text
        .removeprefix('In stock,')
        .removeprefix('Only')
        .removesuffix(' left')
        .removesuffix('units')
        .strip()
    )
    units = 0 if 'Sold out' in units_text else int(units_text)

    print(f"{title} | {units}")
