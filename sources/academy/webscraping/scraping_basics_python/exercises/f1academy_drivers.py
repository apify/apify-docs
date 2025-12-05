import httpx
from bs4 import BeautifulSoup

url = "https://www.f1academy.com/Racing-Series/Teams"
response = httpx.get(url)
response.raise_for_status()

soup = BeautifulSoup(response.text, "html.parser")
print(len(soup.select('.driver')))
