import httpx
from bs4 import BeautifulSoup
from urllib.parse import urljoin

listing_url = "https://en.wikipedia.org/wiki/List_of_sovereign_states_and_dependent_territories_in_Africa"
response = httpx.get(listing_url)
response.raise_for_status()

soup = BeautifulSoup(response.text, "html.parser")

for name_cell in soup.select('.wikitable tr td:nth-child(3)'):
    link = name_cell.select_one('a')
    if link and 'href' in link.attrs:
        url = urljoin(listing_url, link['href'])
        print(url)
