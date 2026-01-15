import httpx
from bs4 import BeautifulSoup
from urllib.parse import urljoin


def download(url: str) -> BeautifulSoup:
    response = httpx.get(url)
    response.raise_for_status()
    return BeautifulSoup(response.text, "html.parser")


def parse_whc_count(soup: BeautifulSoup) -> int:
    for info_card in soup.select(".card-body"):
        title = info_card.select_one(".card-title").text
        if "World Heritage Sites" in title:
            return int(info_card.select_one(".card-number").text.strip())
    return 0


listing_url = "https://www.unesco.org/en/countries"
listing_soup = download(listing_url)
countries = listing_soup.select(".node--type-country")

for country in countries[:10]:
    link = country.select_one("a")
    if not link or 'href' not in link.attrs:
        continue

    country_url = urljoin(listing_url, link["href"])
    country_soup = download(country_url)
    whs_count = parse_whc_count(country_soup)
    print(country_url, whs_count)
