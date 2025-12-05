import httpx
from bs4 import BeautifulSoup
from urllib.parse import urljoin

listing_url = "https://www.theguardian.com/sport/formulaone"
response = httpx.get(listing_url)
response.raise_for_status()

soup = BeautifulSoup(response.text, "html.parser")

for item in soup.select('#maincontent ul li'):
    link = item.select_one('a')
    if link and 'href' in link.attrs:
        url = urljoin(listing_url, link['href'])
        print(url)
