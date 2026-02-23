import httpx
from bs4 import BeautifulSoup
from urllib.parse import urljoin


def download(url: str) -> BeautifulSoup:
    response = httpx.get(url)
    response.raise_for_status()
    return BeautifulSoup(response.text, "html.parser")


listing_url = "https://www.wtatennis.com/rankings/singles"
listing_soup = download(listing_url)
player_links = listing_soup.select(".rankings__list .player-row-drawer__link")

for link in player_links[:5]:
    player_url = urljoin(listing_url, link["href"])
    player_soup = download(player_url)

    for info_block in player_soup.select(".profile-bio__info-block"):
        label_text = info_block.select_one("h2").text.strip()
        if label_text.lower() == "birthplace":
            birthplace = info_block.select_one("span").text.strip()
            print(player_url, "|", birthplace)
