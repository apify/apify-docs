---
title: Python Examples
description: Learn how to connect to Apify's datacenter proxies from your application using Python 2 and 3 code examples. Configure proxy groups and IP address use.
paths:
    - proxy/datacenter-proxy/python-examples
---

# [](#python-examples)Python Examples

The following section contain several examples of how to use Apify Proxy in python.

## [](#usage-with-python3) Usage with [Python 3+](https://www.python.org/downloads/)

Single request with random IP chosen from all available proxy groups.

    import urllib.request as request
    import ssl
    # Replace <YOUR_PROXY_PASSWORD> below with your password
    # found at https://my.apify.com/proxy
    password = '<YOUR_PROXY_PASSWORD>'
    proxy_url = f"http://auto:{password}@proxy.apify.com:8000"
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

Two requests with the same session chosen from all available proxy groups.

    import urllib.request as request
    import ssl

    def do_request():
        # Replace <YOUR_PROXY_PASSWORD> below with your password
        # found at https://my.apify.com/proxy
        password = '<YOUR_PROXY_PASSWORD>'
        proxy_url = f"http://session-my_session:{password}@proxy.apify.com:8000"
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
    print('Should return the contain the same clientIp as ')
    print(do_request())

Two requests with the different IPs chosen from `SHADER` and `BUYPROXIES94952` proxy groups.

    import urllib.request as request
    import ssl

    def do_request():
        # Replace <YOUR_PROXY_PASSWORD> below with your password
        # found at https://my.apify.com/proxy
        password = '<YOUR_PROXY_PASSWORD>'
        proxy_url = f"http://groups-SHADER+BUYPROXIES94952:{password}@proxy.apify.com:8000"
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
    print('Should return the contain different clientIp than ')
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
        'http://auto:%s@proxy.apify.com:8000' %
        (password)
    )
    proxy_handler = request.ProxyHandler({
        'http': proxy_url,
        'https': proxy_url,
    })
    opener = request.build_opener(proxy_handler)
    print(opener.open('https://api.apify.com/v2/browser-info').read())

Two requests with the same session chosen from all available proxy groups.

    import six
    from six.moves.urllib import request
    import ssl

    def do_request():
        # Replace <YOUR_PROXY_PASSWORD> below with your password
        # found at https://my.apify.com/proxy
        password = '<YOUR_PROXY_PASSWORD>'
        proxy_url = (
            'http://session-my_session:%s@proxy.apify.com:8000' %
            (password)
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
    print('Should return the contain the same clientIp as ')
    print(do_request())

Two requests with the different IPs chosen from `SHADER` and `BUYPROXIES94952` proxy groups.

    import six
    from six.moves.urllib import request
    import ssl

    def do_request():
        # Replace <YOUR_PROXY_PASSWORD> below with your password
        # found at https://my.apify.com/proxy
        password = '<YOUR_PROXY_PASSWORD>'
        proxy_url = (
            'http://groups-SHADER+BUYPROXIES94952:%s@proxy.apify.com:8000' %
            (password)
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
    print('Should return the contain different clientIp than ')
    print(do_request())

