from datetime import datetime

import httpx
from bs4 import BeautifulSoup

url = "https://www.theguardian.com/sport/formulaone"
response = httpx.get(url)
response.raise_for_status()

soup = BeautifulSoup(response.text, "html.parser")

for article in soup.select('#maincontent ul li'):
    title_tag = article.select_one('h3')
    time_tag = article.select_one('time')

    if not title_tag or not time_tag or 'datetime' not in time_tag.attrs:
        continue

    title = title_tag.text.strip()
    date_iso = time_tag['datetime'].strip()
    date = datetime.fromisoformat(date_iso)

    print(f"{title} | {date.strftime('%a %b %d %Y')}")
