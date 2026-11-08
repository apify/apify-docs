import httpx2

url = "https://www.lego.com/en-us/themes/star-wars"
response = httpx2.get(url)
response.raise_for_status()
print(response.text)
