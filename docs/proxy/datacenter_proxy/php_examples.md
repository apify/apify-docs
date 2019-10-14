---
title: PHP Examples
---

### [](#datacenter-proxy--php-examples)PHP Examples

The following section contain several examples of how to use Apify Proxy in PHP.

#### Usage with [CURL](http://php.net/manual/en/book.curl.php)

**IMPORTANT:** For all examples in this section you need to have cURL extension enabled in your PHP installation. See [installation instructions](http://php.net/manual/en/curl.installation.php) for more information.

Single request with random IP chosen from all available proxy groups.

    <?php
    $curl = curl_init('https://api.apify.com/v2/browser-info');
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_PROXY, 'http://proxy.apify.com:8000');
    // Replace <YOUR_PROXY_PASSWORD> below with your password
    // found at https://my.apify.com/proxy
    curl_setopt($curl, CURLOPT_PROXYUSERPWD, 'auto:<YOUR_PROXY_PASSWORD>');
    $response = curl_exec($curl);
    curl_close($curl);
    if ($response) echo $response;
    ?>

Two requests with the same session chosen from all available proxy groups.

    <?php
    function doRequest() {
        $curl = curl_init('https://api.apify.com/v2/browser-info');
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl, CURLOPT_PROXY, 'http://proxy.apify.com:8000');
        // Replace <YOUR_PROXY_PASSWORD> below with your password
        // found at https://my.apify.com/proxy
        curl_setopt($curl, CURLOPT_PROXYUSERPWD, 'session-my_session:<YOUR_PROXY_PASSWORD>');
        $response = curl_exec($curl);
        curl_close($curl);
        return $response;
    }
    $response1 = doRequest();
    $response2 = doRequest();
    echo $response1;
    echo "\nShould be contain same clientIp as\n";
    echo $response2;
    ?>

Two requests with the different IPs chosen from `SHADER` and `BUYPROXIES94952` proxy groups.

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
