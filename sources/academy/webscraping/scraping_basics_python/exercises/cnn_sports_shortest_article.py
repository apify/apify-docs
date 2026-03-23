import httpx
from bs4 import BeautifulSoup
from urllib.parse import urljoin


def download(url: str) -> BeautifulSoup:
    response = httpx.get(url)
    response.raise_for_status()
    return BeautifulSoup(response.text, "html.parser")


listing_url = "https://edition.cnn.com/sport"
listing_soup = download(listing_url)

results: list[tuple[int, str]] = []
for card in listing_soup.select('.layout__main .card'):
    link = card.select_one('.container__link')
    if not link or 'href' not in link.attrs:
        continue

    article_url = urljoin(listing_url, link['href'])
    article_soup = download(article_url)
    content = article_soup.select_one('.article__content')

    if not content:
        continue

    results.append((len(content.get_text()), article_url))

results.sort()
if results:
    print(results[0][1])
