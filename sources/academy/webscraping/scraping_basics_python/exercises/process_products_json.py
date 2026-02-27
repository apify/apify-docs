import json
from pprint import pp

with open('products.json', 'r', encoding='utf-8') as file:
    products = json.load(file)

for product in products:
    if int(product["min_price"]) > 50000:
        pp(product)
