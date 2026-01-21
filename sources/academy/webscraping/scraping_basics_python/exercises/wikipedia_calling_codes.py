import httpx
from bs4 import BeautifulSoup
from urllib.parse import urljoin


def download(url: str) -> BeautifulSoup:
    response = httpx.get(url)
    response.raise_for_status()
    return BeautifulSoup(response.text, "html.parser")


def parse_calling_code(soup: BeautifulSoup) -> str | None:
    for label in soup.select('th.infobox-label'):
        if label.text.strip() == 'Calling code':
            cell = label.parent.select_one('td.infobox-data')
            return cell.text.strip() if cell else None
    return None


listing_url = "https://en.wikipedia.org/wiki/List_of_sovereign_states_and_dependent_territories_in_Africa"
listing_soup = download(listing_url)

for name_cell in listing_soup.select('.wikitable tr td:nth-child(3)'):
    link = name_cell.select_one('a')
    if not link or 'href' not in link.attrs:
        continue

    country_url = urljoin(listing_url, link['href'])
    country_soup = download(country_url)
    calling_code = parse_calling_code(country_soup)

    print(country_url, calling_code)
