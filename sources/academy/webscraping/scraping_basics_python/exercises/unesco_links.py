import httpx
from bs4 import BeautifulSoup
from urllib.parse import urljoin

listing_url = "https://www.unesco.org/en/countries"
response = httpx.get(listing_url)
response.raise_for_status()

soup = BeautifulSoup(response.text, "html.parser")

for country in soup.select(".node--type-country"):
    link = country.select_one("a")
    if link and 'href' in link.attrs:
        url = urljoin(listing_url, link["href"])
        print(url)
