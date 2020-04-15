---
title: PHP Examples
menuTitle: PHP Examples
description: Documentation of Apify Proxy that enables anonymization of access to websites and IP rotation.
paths:
    - proxy/google-serp-proxy/php-examples
---

# [](#php-examples)PHP Examples

The following section contain several examples of how to use Google SERP proxy in PHP.

## [](#usage-with-curl) Usage with [CURL](http://php.net/manual/en/book.curl.php)

**IMPORTANT:** For all examples in this section you need to have cURL extension enabled in your PHP installation. See [installation instructions](http://php.net/manual/en/curl.installation.php) for more information.

Get HTML of search results from the US for keyword `wikipedia`

    <?php
    $query = urlencode('wikipedia');
    $curl = curl_init('http://www.google.com/search?q=' . $query);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_PROXY, 'http://proxy.apify.com:8000');
    // Replace <YOUR_PROXY_PASSWORD> below with your password
    // found at https://my.apify.com/proxy
    curl_setopt($curl, CURLOPT_PROXYUSERPWD, 'groups-GOOGLE_SERP:<YOUR_PROXY_PASSWORD>');
    $response = curl_exec($curl);
    curl_close($curl);
    echo $response;
    ?>

Get HTML of shopping results from the Czech Republic for query `Apple iPhone XS 64GB`

    <?php
    $query = urlencode('Apple iPhone XS 64GB');
    $curl = curl_init('http://www.google.com/search?tbm=shop&q=' . $query);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_PROXY, 'http://proxy.apify.com:8000');
    // Replace <YOUR_PROXY_PASSWORD> below with your password
    // found at https://my.apify.com/proxy
    curl_setopt($curl, CURLOPT_PROXYUSERPWD, 'groups-GOOGLE_SERP:<YOUR_PROXY_PASSWORD>');
    $response = curl_exec($curl);
    curl_close($curl);
    echo $response;
    ?>

