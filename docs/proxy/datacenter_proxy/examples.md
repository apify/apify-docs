---
title: Examples
description: Learn how to connect to Apify's datacenter proxies from your application using Node.js, Python 2 and 3 and PHP.
paths:
    - proxy/datacenter-proxy/nodejs-examples
    - proxy/datacenter-proxy/python-examples
    - proxy/datacenter-proxy/php-examples
    - proxy/datacenter-proxy/examples
---

for JS, use these
Got:
https://www.npmjs.com/package/got
https://stackoverflow.com/questions/55981040/how-to-use-axios-with-a-proxy-server-to-make-an-https-call

Axios:
https://www.npmjs.com/package/axios
https://stackoverflow.com/questions/55981040/how-to-use-axios-with-a-proxy-server-to-make-an-https-call

I will need to send authentication tokens in the URLs when doing the proxy requests


#### Use one IP selected from the `SHADER` proxy group for two requests.

```marked-tabs
<marked-tab header="NodeJS" lang="javascript">
    const Apify = require('apify');

    Apify.main(async () => {
        const proxyConfiguration = await Apify.createProxyConfiguration({
            groups: ['SHADER']
        });
        const proxyUrl = proxyConfiguration.newUrl('my_session');

        try {
            const response1 = await Apify.utils.requestAsBrowser({
                url: 'https://api.apify.com/v2/browser-info',
                proxyUrl,
                json: true
            });
            const response2 = await Apify.utils.requestAsBrowser({
                url: 'https://api.apify.com/v2/browser-info',
                proxyUrl,
                json: true
            });
            console.log(response1.body.clientIp);
            console.log('should be the same as');
            console.log(response2.body.clientIp);
        } catch (e) {
            console.error(e);
        }
    });
</marked-tab>


<marked-tab header="Python 3+" lang="python3">
    print('Some python code');

    count = 1

    if count >= 1:

        print('Some intended python code');

    print('Some python code on next line');
</marked-tab>


<marked-tab header="PHP" lang="php">
    echo "Some bash code"
</marked-tab>

```




#### Two requests with different IPs chosen from the `SHADER` and `BUYPROXIES94952` proxy groups

```marked-tabs
<marked-tab header="NodeJS" lang="javascript">

</marked-tab>


<marked-tab header="Python 3+" lang="python3">
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
</marked-tab>


<marked-tab header="Python 2+" lang="python2">
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
</marked-tab>


<marked-tab header="PHP" lang="php">
    <?php
    function doRequest() {
        $curl = curl_init('https://api.apify.com/v2/browser-info');
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl, CURLOPT_PROXY, 'http://proxy.apify.com:8000');
        // Replace <YOUR_PROXY_PASSWORD> below with your password
        // found at https://my.apify.com/proxy
        curl_setopt($curl, CURLOPT_PROXYUSERPWD, 'groups-SHADER+BUYPROXIES94952:<YOUR_PROXY_PASSWORD>');
        $response = curl_exec($curl);
        curl_close($curl);
        return $response;
    }
    $response1 = doRequest();
    $response2 = doRequest();
    echo $response1;
    echo "\nShould have different clientIp than\n";
    echo $response2;
    ?>
</marked-tab>
```


## Examples using the Apify SDK

```marked-tabs
<marked-tab header="PuppeteerScraper" lang="javascript">

</marked-tab>


<marked-tab header="Apify.launchPuppeteer()" lang="javascript">

</marked-tab>


<marked-tab header="requestAsBrowser()" lang="javascript">

</marked-tab>

```
