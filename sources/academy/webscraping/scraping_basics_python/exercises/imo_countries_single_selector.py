import httpx
from bs4 import BeautifulSoup

url = "https://www.imo.org/en/ourwork/ero/pages/memberstates.aspx"
response = httpx.get(url)
response.raise_for_status()

soup = BeautifulSoup(response.text, "html.parser")

for cell in soup.select(".content table tr td:nth-child(odd)"):
    if name := cell.text.strip():
        print(name)
