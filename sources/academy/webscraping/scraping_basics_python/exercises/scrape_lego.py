import httpx

url = "https://www.lego.com/themes/star-wars"
response = httpx.get(url)
response.raise_for_status()
print(response.text)
