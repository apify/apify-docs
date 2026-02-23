import httpx
from bs4 import BeautifulSoup
from urllib.parse import urljoin

listing_url = "https://www.wtatennis.com/rankings/singles"
response = httpx.get(listing_url)
response.raise_for_status()

soup = BeautifulSoup(response.text, "html.parser")

for link in soup.select(".rankings__list .player-row-drawer__link"):
    player_url = urljoin(listing_url, link["href"])
    print(player_url)
