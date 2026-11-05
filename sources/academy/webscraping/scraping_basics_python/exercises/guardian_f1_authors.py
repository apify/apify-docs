import httpx
from bs4 import BeautifulSoup
from urllib.parse import urljoin


def download(url: str) -> BeautifulSoup:
    response = httpx.get(url)
    response.raise_for_status()
    return BeautifulSoup(response.text, "html.parser")


def parse_author(article_soup: BeautifulSoup) -> str | None:
    for selector in ['a[rel="author"]', 'aside address']:
        element = article_soup.select_one(selector)
        if element and element.text.strip():
            return element.text.strip()
    return None


listing_url = "https://www.theguardian.com/sport/formulaone"
listing_soup = download(listing_url)

for item in listing_soup.select('#maincontent ul li'):
    link = item.select_one('a')
    if not link or 'href' not in link.attrs:
        continue

    article_url = urljoin(listing_url, link['href'])
    article_soup = download(article_url)

    title = article_soup.select_one('h1').text.strip()
    author = parse_author(article_soup)

    print(f"{author}: {title}")
