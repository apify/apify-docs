from datetime import datetime, date, timedelta
from pprint import pp

import httpx
from bs4 import BeautifulSoup
from urllib.parse import urljoin


today = date.today()
jobs_url = "https://www.python.org/jobs/type/database/"
response = httpx.get(jobs_url)
response.raise_for_status()

soup = BeautifulSoup(response.text, "html.parser")

for job in soup.select('.list-recent-jobs li'):
    link = job.select_one('.listing-company-name a')
    if not link:
        continue

    time_tag = job.select_one('.listing-posted time')
    if not time_tag or 'datetime' not in time_tag.attrs:
        continue

    posted_at = datetime.fromisoformat(time_tag['datetime'])
    posted_on = posted_at.date()

    if today - posted_on <= timedelta(days=60):
        title = link.text.strip()
        company = list(job.select_one('.listing-company-name').stripped_strings)[-1]
        url = urljoin(jobs_url, link['href'])
        pp({"title": title, "company": company, "url": url, "posted_on": posted_on})
