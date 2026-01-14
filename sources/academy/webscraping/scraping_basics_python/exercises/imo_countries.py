import httpx
from bs4 import BeautifulSoup

url = "https://www.imo.org/en/ourwork/ero/pages/memberstates.aspx"

response = httpx.get(url)
response.raise_for_status()

soup = BeautifulSoup(response.text, "html.parser")

for table in soup.select(".content table"):
    for row in table.select("tr"):
        if cells := row.select("td"):
            first_column = cells[0]
            if text := first_column.text.strip():
                print(text)
    for row in table.select("tr"):
        if cells := row.select("td"):
            if len(cells) > 2:
                third_column = cells[2]
                if text := third_column.text.strip():
                    print(text)
