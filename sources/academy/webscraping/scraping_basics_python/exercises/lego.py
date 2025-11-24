import httpx

url = "https://www.lego.com/en-us/themes/star-wars"
response = httpx.get(url)
response.raise_for_status()
print(response.text)
