import httpx
from bs4 import BeautifulSoup

url = "https://en.wikipedia.org/wiki/List_of_sovereign_states_and_dependent_territories_in_Africa"
response = httpx.get(url)
response.raise_for_status()

soup = BeautifulSoup(response.text, "html.parser")

for table in soup.select(".wikitable"):
    for row in table.select("tr"):
        cells = row.select("td")
        if cells:
            third_column = cells[2]
            link = third_column.select_one("a")
            if link:
                print(link.text)
