---
title: Locating HTML elements with Node.js
sidebar_label: Locating HTML elements
description: Lesson about building a Node.js application for watching prices. Using the /TBD/ library to locate products on the product listing page.
slug: /scraping-basics-javascript2/locating-elements
unlisted: true
---

import Exercises from './_exercises.mdx';

**In this lesson we'll locate product data in the downloaded HTML. We'll use /TBD/ to find those HTML elements which contain details about each product, such as title or price.**

---

In the previous lesson we've managed to print text of the page's main heading or count how many products are in the listing. Let's combine those two. What happens if we print `.text` for each product card?

```py
import httpx
from bs4 import BeautifulSoup

url = "https://warehouse-theme-metal.myshopify.com/collections/sales"
response = httpx.get(url)
response.raise_for_status()

html_code = response.text
soup = BeautifulSoup(html_code, "html.parser")

for product in soup.select(".product-item"):
    print(product.text)
```

Well, it definitely prints _something_…

```text
$ python main.py
Save $25.00


JBL
JBL Flip 4 Waterproof Portable Bluetooth Speaker



Black

+7


Blue

+6


Grey
...
```

To get details about each product in a structured way, we'll need a different approach.

## Locating child elements

As in the browser DevTools lessons, we need to change the code so that it locates child elements for each product card.

![Product card's child elements](./images/child-elements.png)

We should be looking for elements which have the `product-item__title` and `price` classes. We already know how that translates to CSS selectors:

```py
import httpx
from bs4 import BeautifulSoup

url = "https://warehouse-theme-metal.myshopify.com/collections/sales"
response = httpx.get(url)
response.raise_for_status()

html_code = response.text
soup = BeautifulSoup(html_code, "html.parser")

for product in soup.select(".product-item"):
    titles = product.select(".product-item__title")
    first_title = titles[0].text

    prices = product.select(".price")
    first_price = prices[0].text

    print(first_title, first_price)
```

Let's run the program now:

```text
$ python main.py
JBL Flip 4 Waterproof Portable Bluetooth Speaker
Sale price$74.95
Sony XBR-950G BRAVIA 4K HDR Ultra HD TV
Sale priceFrom $1,398.00
...
```

There's still some room for improvement, but it's already much better!

## Locating a single element

Often, we want to assume in our code that a certain element exists only once. It's a bit tedious to work with lists when you know you're looking for a single element. For this purpose, Beautiful Soup offers the `.select_one()` method. Like `document.querySelector()` in browser DevTools, it returns just one result or `None`. Let's simplify our code!

```py
import httpx
from bs4 import BeautifulSoup

url = "https://warehouse-theme-metal.myshopify.com/collections/sales"
response = httpx.get(url)
response.raise_for_status()

html_code = response.text
soup = BeautifulSoup(html_code, "html.parser")

for product in soup.select(".product-item"):
    title = product.select_one(".product-item__title").text
    price = product.select_one(".price").text
    print(title, price)
```

This program does the same as the one we already had, but its code is more concise.

:::note Fragile code

We assume that the selectors we pass to the `select()` or `select_one()` methods return at least one element. If they don't, calling `[0]` on an empty list or `.text` on `None` would crash the program. If you perform type checking on your Python program, the code examples above will trigger warnings about this.

Not handling these cases allows us to keep the code examples more succinct. Additionally, if we expect the selectors to return elements but they suddenly don't, it usually means the website has changed since we wrote our scraper. Letting the program crash in such cases is a valid way to notify ourselves that we need to fix it.

:::

## Precisely locating price

In the output we can see that the price isn't located precisely:

```text
JBL Flip 4 Waterproof Portable Bluetooth Speaker
Sale price$74.95
Sony XBR-950G BRAVIA 4K HDR Ultra HD TV
Sale priceFrom $1,398.00
...
```

For each product, our scraper also prints the text `Sale price`. Let's look at the HTML structure again. Each bit containing the price looks like this:

```html
<span class="price">
  <span class="visually-hidden">Sale price</span>
  $74.95
</span>
```

When translated to a tree of Python objects, the element with class `price` will contain several _nodes_:

- Textual node with white space,
- a `span` HTML element,
- a textual node representing the actual amount and possibly also white space.

We can use Beautiful Soup's `.contents` property to access individual nodes. It returns a list of nodes like this:

```py
["\n", <span class="visually-hidden">Sale price</span>, "$74.95"]
```

It seems like we can read the last element to get the actual amount from a list like the above. Let's fix our program:

```py
import httpx
from bs4 import BeautifulSoup

url = "https://warehouse-theme-metal.myshopify.com/collections/sales"
response = httpx.get(url)
response.raise_for_status()

html_code = response.text
soup = BeautifulSoup(html_code, "html.parser")

for product in soup.select(".product-item"):
    title = product.select_one(".product-item__title").text
    price = product.select_one(".price").contents[-1]
    print(title, price)
```

If we run the scraper now, it should print prices as only amounts:

```text
$ python main.py
JBL Flip 4 Waterproof Portable Bluetooth Speaker $74.95
Sony XBR-950G BRAVIA 4K HDR Ultra HD TV From $1,398.00
...
```

## Formatting output

The results seem to be correct, but they're hard to verify because the prices visually blend with the titles. Let's set a different separator for the `print()` function:

```py
print(title, price, sep=" | ")
```

The output is much nicer this way:

```text
$ python main.py
JBL Flip 4 Waterproof Portable Bluetooth Speaker | $74.95
Sony XBR-950G BRAVIA 4K HDR Ultra HD TV | From $1,398.00
...
```

Great! We have managed to use CSS selectors and walk the HTML tree to get a list of product titles and prices. But wait a second—what's `From $1,398.00`? One does not simply scrape a price! We'll need to clean that. But that's a job for the next lesson, which is about extracting data.

---

<Exercises />

### Scrape Wikipedia

Download Wikipedia's page with the list of African countries, use Beautiful Soup to parse it, and print short English names of all the states and territories mentioned in all tables. This is the URL:

```text
https://en.wikipedia.org/wiki/List_of_sovereign_states_and_dependent_territories_in_Africa
```

Your program should print the following:

```text
Algeria
Angola
Benin
Botswana
...
```

<details>
  <summary>Solution</summary>

  ```py
  import httpx
  from bs4 import BeautifulSoup

  url = "https://en.wikipedia.org/wiki/List_of_sovereign_states_and_dependent_territories_in_Africa"
  response = httpx.get(url)
  response.raise_for_status()

  html_code = response.text
  soup = BeautifulSoup(html_code, "html.parser")

  for table in soup.select(".wikitable"):
      for row in table.select("tr"):
          cells = row.select("td")
          if cells:
              third_column = cells[2]
              title_link = third_column.select_one("a")
              print(title_link.text)
  ```

  Because some rows contain [table headers](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th), we skip processing a row if `table_row.select("td")` doesn't find any [table data](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td) cells.

</details>

### Use CSS selectors to their max

Simplify the code from previous exercise. Use a single for loop and a single CSS selector. You may want to check out the following pages:

- [Descendant combinator](https://developer.mozilla.org/en-US/docs/Web/CSS/Descendant_combinator)
- [`:nth-child()` pseudo-class](https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child)

<details>
  <summary>Solution</summary>

  ```py
  import httpx
  from bs4 import BeautifulSoup

  url = "https://en.wikipedia.org/wiki/List_of_sovereign_states_and_dependent_territories_in_Africa"
  response = httpx.get(url)
  response.raise_for_status()

  html_code = response.text
  soup = BeautifulSoup(html_code, "html.parser")

  for name_cell in soup.select(".wikitable tr td:nth-child(3)"):
      print(name_cell.select_one("a").text)
  ```

</details>

### Scrape F1 news

Download Guardian's page with the latest F1 news, use Beautiful Soup to parse it, and print titles of all the listed articles. This is the URL:

```text
https://www.theguardian.com/sport/formulaone
```

Your program should print something like the following:

```text
Wolff confident Mercedes are heading to front of grid after Canada improvement
Frustrated Lando Norris blames McLaren team for missed chance
Max Verstappen wins Canadian Grand Prix: F1 – as it happened
...
```

<details>
  <summary>Solution</summary>

  ```py
  import httpx
  from bs4 import BeautifulSoup

  url = "https://www.theguardian.com/sport/formulaone"
  response = httpx.get(url)
  response.raise_for_status()

  html_code = response.text
  soup = BeautifulSoup(html_code, "html.parser")

  for title in soup.select("#maincontent ul li h3"):
      print(title.text)
  ```

</details>
