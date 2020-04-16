---
title: Python Examples
description: Documentation of Apify Proxy that enables anonymization of access to websites and IP rotation.
redirectPaths:
    - proxy/residential-proxy/python-examples
---

# [](#python-examples)Python Examples

The following section contain several examples of how to use Apify Proxy in python.

## [](#usage-with-python3) Usage with [Python 3+](https://www.python.org/downloads/)

Single request with random IP chosen from all available countries.

    import urllib.request as request
    import ssl
    # Replace <YOUR_PROXY_PASSWORD> below with your password
    # found at https://my.apify.com/proxy
    password = '<YOUR_PROXY_PASSWORD>'
    proxy_url = f"http://groups-RESIDENTIAL:{password}@proxy.apify.com:8000"
    proxy_handler = request.ProxyHandler({
        'http': proxy_url,
        'https': proxy_url,
    })

    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE
    httpHandler = request.HTTPSHandler(context=ctx)

    opener = request.build_opener(httpHandler,proxy_handler)
    print(opener.open('https://api.apify.com/v2/browser-info').read())

Two requests with the same IP geolocated in Japan.

    import urllib.request as request
    import ssl

    def do_request():
        # Replace <YOUR_PROXY_PASSWORD> below with your password
        # found at https://my.apify.com/proxy
        password = '<YOUR_PROXY_PASSWORD>'
        username = f"groups-RESIDENTIAL,session-my_session_6,country-JP"
        proxy_url = f"http://{username}:{password}@proxy.apify.com:8000"
        proxy_handler = request.ProxyHandler({
            'http': proxy_url,
            'https': proxy_url,
        })

        ctx = ssl.create_default_context()
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE
        httpHandler = request.HTTPSHandler(context=ctx)

        opener = request.build_opener(httpHandler,proxy_handler)
        return opener.open('https://api.apify.com/v2/browser-info').read()

    print(do_request())
    print('Should contain the same clientIp as')
    print(do_request())

Two requests with the different IPs from the Czech Republic.

    import urllib.request as request
    import ssl

    def do_request():
        # Replace <YOUR_PROXY_PASSWORD> below with your password
        # found at https://my.apify.com/proxy
        password = '<YOUR_PROXY_PASSWORD>'
        username = f"groups-RESIDENTIAL,country-CZ"
        proxy_url = f"http://{username}:{password}@proxy.apify.com:8000"
        proxy_handler = request.ProxyHandler({
            'http': proxy_url,
            'https': proxy_url,
        })

        ctx = ssl.create_default_context()
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE
        httpHandler = request.HTTPSHandler(context=ctx)

        opener = request.build_opener(httpHandler,proxy_handler)
        return opener.open('https://api.apify.com/v2/browser-info').read()

    print(do_request())
    print('Should contain different clientIp than ')
    print(do_request())

## [](#usage-with-python2) Usage with [Python 2+](https://www.python.org/download/releases/2.7.2/)

**IMPORTANT:** For all examples in this section you need to have [six](https://pypi.org/project/six/) enabled in your Python installation. Run `pip install six` to enable it.

Single request with random IP chosen from all available proxy groups.

    import six
    from six.moves.urllib import request

    # Replace <YOUR_PROXY_PASSWORD> below with your password
    # found at https://my.apify.com/proxy
    password = '<YOUR_PROXY_PASSWORD>'
    proxy_url = (
        'http://groups-RESIDENTIAL:%s@proxy.apify.com:8000' %
        (password)
    )
    proxy_handler = request.ProxyHandler({
        'http': proxy_url,
        'https': proxy_url,
    })
    opener = request.build_opener(proxy_handler)
    print(opener.open('https://api.apify.com/v2/browser-info').read())

Two requests with the same session geolocated in the US.

    import six
    from six.moves.urllib import request
    import ssl

    def do_request():
        # Replace <YOUR_PROXY_PASSWORD> below with your password
        # found at https://my.apify.com/proxy
        password = '<YOUR_PROXY_PASSWORD>'
        username = 'groups-RESIDENTIAL,session-my_session_7,country-us'
        proxy_url = (
            'http://%s:%s@proxy.apify.com:8000' %
            (username, password)
        )
        proxy_handler = request.ProxyHandler({
            'http': proxy_url,
            'https': proxy_url,
        })

        ctx = ssl.create_default_context()
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE
        httpHandler = request.HTTPSHandler(context=ctx)

        opener = request.build_opener(httpHandler,proxy_handler)
        return opener.open('https://api.apify.com/v2/browser-info').read()

    print(do_request())
    print('Should contain the same clientIp as ')
    print(do_request())

Two requests with different IPs geolocated in the Czech Republic.

    import six
    from six.moves.urllib import request
    import ssl

    def do_request():
        # Replace <YOUR_PROXY_PASSWORD> below with your password
        # found at https://my.apify.com/proxy
        password = '<YOUR_PROXY_PASSWORD>'
        username = 'groups-RESIDENTIAL,country-CZ'
        proxy_url = (
            'http://%s:%s@proxy.apify.com:8000' %
            (username, password)
        )

        proxy_handler = request.ProxyHandler({
            'http': proxy_url,
            'https': proxy_url,
        })

        ctx = ssl.create_default_context()
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE
        httpHandler = request.HTTPSHandler(context=ctx)

        opener = request.build_opener(httpHandler,proxy_handler)
        return opener.open('https://api.apify.com/v2/browser-info').read()

    print(do_request())
    print('Should contain different clientIp than ')
    print(do_request())

