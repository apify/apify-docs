---
title: Python Examples
description: Learn how to connect to Google SERP proxies from your application using Python 2 and 3 code examples. Configure proxy locations and reduce blocking when web scraping.
paths:
    - proxy/google-serp-proxy/python-examples
---

# [](#python-examples)Python Examples

The following section contain several examples of how to use Google SERP proxy in python.

## [](#usage-with-python3) Usage with [Python 3+](https://www.python.org/downloads/)

Get HTML of search results from the US for keyword `wikipedia`

    import urllib.request as request
    import urllib.parse as parse

    # Replace <YOUR_PROXY_PASSWORD> below with your password
    # found at https://my.apify.com/proxy
    password = '<YOUR_PROXY_PASSWORD>'
    proxy_url = f"http://groups-GOOGLE_SERP:{password}@proxy.apify.com:8000"

    proxy_handler = request.ProxyHandler({
        'http': proxy_url,
    })

    opener = request.build_opener(proxy_handler)

    query = parse.urlencode({ 'q': 'wikipedia' })
    print(opener.open(f"http://www.google.com/search?{query}").read())

Get HTML of shopping results from the Czech Republic for query `Apple iPhone XS 64GB`

    import urllib.request as request
    import urllib.parse as parse

    # Replace <YOUR_PROXY_PASSWORD> below with your password
    # found at https://my.apify.com/proxy
    password = '<YOUR_PROXY_PASSWORD>'
    proxy_url = f"http://groups-GOOGLE_SERP:{password}@proxy.apify.com:8000"
    proxy_handler = request.ProxyHandler({
        'http': proxy_url,
    })
    opener = request.build_opener(proxy_handler)

    query = parse.urlencode({ 'q': 'Apple iPhone XS 64GB', 'tbm': 'shop' })
    print(opener.open(f"http://www.google.cz/search?{query}").read())

## [](#usage-with-python2) Usage with [Python 2+](https://www.python.org/download/releases/2.7.2/)

**IMPORTANT:** For all examples in this section you need to have [six](https://pypi.org/project/six/) enabled in your Python installation. Run `pip install six` to enable it.

Get HTML of search results from the US for keyword `wikipedia`

    import six
    from six.moves.urllib import request, urlencode

    # Replace <YOUR_PROXY_PASSWORD> below with your password
    # found at https://my.apify.com/proxy
    password = '<YOUR_PROXY_PASSWORD>'
    proxy_url = (
        'http://groups-GOOGLE_SERP:%s@proxy.apify.com:8000' %
        (password)
    )
    proxy_handler = request.ProxyHandler({
        'http': proxy_url,
    })
    opener = request.build_opener(proxy_handler)
    query = parse.urlencode({ 'q': 'wikipedia' })
    url = (
        'http://www.google.com/search?%s' %
        (query)
    )
    print(opener.open(url).read())

Get HTML of shopping results from the Czech Republic for query `Apple iPhone XS 64GB`

    import six
    from six.moves.urllib import request, urlencode

    # Replace <YOUR_PROXY_PASSWORD> below with your password
    # found at https://my.apify.com/proxy
    password = '<YOUR_PROXY_PASSWORD>'
    proxy_url = (
        'http://groups-GOOGLE_SERP:%s@proxy.apify.com:8000' %
        (password)
    )
    proxy_handler = request.ProxyHandler({
        'http': proxy_url,
    })
    opener = request.build_opener(proxy_handler)
    query = parse.urlencode({ 'q': 'Apple iPhone XS 64GB', 'tbm': 'shop' })
    url = (
        'http://www.google.cz/search?%s' %
        (query)
    )
    print(opener.open(url).read())

