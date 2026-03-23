import httpx
from bs4 import BeautifulSoup

url = "https://www.theguardian.com/sport/formulaone"
response = httpx.get(url)
response.raise_for_status()

soup = BeautifulSoup(response.text, "html.parser")

for title in soup.select("#maincontent ul li h3"):
    print(title.text)
