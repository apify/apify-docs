import httpx
from bs4 import BeautifulSoup
from urllib.parse import urljoin


def download(url: str) -> BeautifulSoup:
    response = httpx.get(url)
    response.raise_for_status()
    return BeautifulSoup(response.text, "html.parser")


def parse_population(country_soup: BeautifulSoup) -> int | None:
    for item in country_soup.select("li"):
        if "Population" in item.text:
            digits = item.text.replace("Population:", "").replace(" ", "")
            return int(digits)
    raise ValueError("Population not found")


listing_url = "https://european-union.europa.eu/institutions-law-budget/euro/countries-using-euro_en"
listing_soup = download(listing_url)

total_population = 0
euro_countries_accordion = listing_soup.select(".ecl-accordion__item")[0]
for country_link in euro_countries_accordion.select("li a"):
    country_url = urljoin(listing_url, country_link["href"])
    country_soup = download(country_url)
    total_population += parse_population(country_soup)
print(total_population)
