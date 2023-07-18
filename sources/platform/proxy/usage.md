---
title: Usage
description: Learn how to configure and use Apify Proxy. See the required parameters such as the correct username and password.
sidebar_position: 10.1
slug: /proxy/usage
---

# Usage

**Learn how to configure and use Apify Proxy. See the required parameters such as the correct username and password.**

## Connection settings

To connect to the Apify Proxy, you use the [HTTP proxy protocol](https://en.wikipedia.org/wiki/Proxy_server#Web_proxy_servers). This means that you need to configure your HTTP client to use the proxy server at `proxy.apify.com:8000` and provide it with your Apify Proxy password and the other parameters described below.

The full connection string has the following format:

```text
http://<username>:<password>@proxy.apify.com:8000
```

| Parameter           | Value / explanation                                                                                                                                                                                                                                                                                                                                        |
|---------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Proxy type          | `HTTP`                                                                                                                                                                                                                                                                                                                                                     |
| Hostname            | `proxy.apify.com`                                                                                                                                                                                                                                                                                                                                          |
| Port                | `8000`                                                                                                                                                                                                                                                                                                                                                     |
| Username            | Specifies the proxy parameters such as groups, [session](#sessions) and location. <br/>See [username parameters](#username-parameters) below for details. <br/>**Note**: this is not your Apify username.                                                                                                                                |
| Password            | Proxy password. Your password is displayed on the [Proxy](https://console.apify.com/proxy/groups) page in Apify Console. In Apify [actors](../actors/index.mdx), it is passed as the `APIFY_PROXY_PASSWORD`  environment variable. See the [environment variables docs](../actors/development/programming_interface/environment_variables.md) for more details. |

| Static IP Addresses | `18.208.102.16`, `35.171.134.41` Static IP addresses, <br/>that can be used as alternatives to `Hostname`.                                                                                                                                                                                                                                                 |

> **WARNING:** All usage of Apify Proxy with your password is charged towards your account. Do not share the password with untrusted parties or use it from insecure networks – **the password is sent unencrypted** due to the HTTP protocol's [limitations](https://www.guru99.com/difference-http-vs-https.html).

### Username parameters

The `username` field enables you to pass parameters like **[groups](#proxy-groups)**, **[session ID](#sessions)** and **country** for your proxy connection.

For example, if you're using [datacenter proxies](./datacenter_proxy.md) and want to use the `new_job_123` session using the `SHADER` group, the username will be:

```text
groups-SHADER,session-new_job_123
```

The table below describes the available parameters.

<table class="table table-bordered table-condensed">
    <tbody>
    <tr>
        <th><code>groups</code></th>
        <td>
            Set proxied requests to use servers from the selected groups.
            <br/>Set to <code>groups-[group name]</code> or <code>auto</code> when using datacenter proxies.
            <br/>Set to <code>groups-RESIDENTIAL</code> when using residential proxies.
            <br/>Set to <code>groups-GOOGLE_SERP</code> when using Google SERP proxies.
        </td>
    </tr>
    <tr>
        <th><code>session</code></th>
        <td>
            If specified, all proxied requests with the same session identifier are routed
            <br/>through the same IP address. For example <code>session-new_job_123</code>.
            <br /><strong>This parameter is optional</strong>. By default, each proxied request
            is assigned a
            <br/>randomly picked least used IP address.
            <br /><strong>The session string can only contain numbers (0-9), letters (a-z or A-Z),
            dot (.),
            <br/>underscore (_), a tilde (~). The maximum length is 50 characters.</strong>
        </td>
    </tr>
    <tr>
        <th><code>country</code></th>
        <td>
            If specified, all proxied requests will use proxy servers from a selected country.
             <br/>Note that if there are no proxy servers
            <br/>from the specified country, the connection will fail.
             <br/>For example <code>groups-SHADER,country-US</code> uses proxies
             <br/> from the <code>SHADER</code> group located in the USA.
            <br /><strong>This parameter is optional</strong>.
            By default, the proxy uses all available
            <br/>proxy servers from all countries.
        </td>
    </tr>
    </tbody>
</table>

If you want to specify one parameter and not the others, just provide that parameter and omit the others. To use the default behavior (not specifying either `groups`, `session`, or `country`), set the username to **auto**. **auto** serves as a placeholder because the username can't be empty.

## Code examples

We have code examples for connecting to our proxy using the Apify SDK ([JavaScript](/sdk/js) and [Python](/sdk/python)) and [Crawlee](https://crawlee.dev/) and other libraries, as well as examples in PHP.

* [Datacenter proxy](./datacenter_proxy.md#examples)
* [Residential proxy](./residential_proxy.md#connecting-to-residential-proxy)
* [Google SERP proxy](./google_serp_proxy.md#examples)

## IP address rotation {#ip-address-rotation}

Web scrapers can rotate the IP addresses they use to access websites. They assign each request a different IP address, which makes it appear like they are all coming from different users. This greatly enhances performance and data throughout.

Depending on whether you use a [browser](https://apify.com/apify/web-scraper) or [HTTP requests](https://apify.com/apify/cheerio-scraper) for your scraping jobs, IP address rotation works differently.

* Browser – a different IP address is used for each browser.
* HTTP request – a different IP address is used for each request.

**You can use [sessions](#sessions) to manage how you rotate and [persist](#session-persistence) IP addresses.**

[Click here](/academy/anti-scraping/techniques) to learn more about IP address rotation and our findings on how blocking works.

## Sessions {#sessions}

Sessions allow you to use the same IP address for multiple connections.

To set a new session, pass the `session` parameter in your [username](./usage.md#username-parameters) field when connecting to a proxy. This will serve as the session's ID and an IP address will be assigned to it. To [use that IP address in other requests](./datacenter_proxy.md#multiple-requests-with-the-same-ip-address), pass that same session ID in the username field.

The created session will store information such as cookies and can be used to generate [browser fingerprints](https://pixelprivacy.com/resources/browser-fingerprinting/). You can also assign custom user data such as authorization tokens and specific headers.

Sessions are available for [datacenter](./datacenter_proxy.md) and [residential](./residential_proxy.md#session-persistence) proxies.

**This parameter is optional**. By default, each proxied request is assigned a randomly picked least used IP address.

### Session persistence {#session-persistence}

You can persist your sessions (use the same IP address) by setting the `session` parameter in the `username` [field](./usage.md). This assigns a single IP address to a **session ID** after you make the first request.

**Session IDs represent IP addresses. Therefore, you can manage the IP addresses you use by managing sessions.** In cases where you need to keep the same session (e.g. when you need to log in to a website), it is best to keep the same proxy. By assigning an IP address to a **session ID**, you can use that IP for every request you make.

For datacenter proxies, a session persists for **26 hours** ([more info](./datacenter_proxy.md)). For residential proxies, it persists for **1 minute** ([more info](./residential_proxy.md#session-persistence)). Using a session resets its expiry timer.

Google SERP proxies do not support sessions.



## Proxy groups

You can see which proxy groups you have access to on the [Proxy page](https://console.apify.com/proxy/groups) in the Apify Console.

To use a specific proxy group (or multiple groups), specify it in the `username` parameter.

## Troubleshooting

To view your connection status to [Apify Proxy](https://apify.com/proxy), open the URL below in the browser using the proxy:

[http://proxy.apify.com/](http://proxy.apify.com/)

If the proxy connection is working, the page should look something like this:

![Apify proxy status page](./images/proxy-status.png)

To test that your requests are proxied and IP addresses are being [rotated](/academy/anti-scraping/techniques) correctly, open the following API endpoint via the proxy. It shows information about the client IP address.

[https://api.apify.com/v2/browser-info/](https://api.apify.com/v2/browser-info/)

### A different approach to `502 Bad Gateway`

There are times when the `502` status code is not comprehensive enough. Therefore, we have modified our server with `590-599` codes instead to provide more insight.

* `590 Non Successful`: upstream responded with non-200 status code.

* `591 RESERVED`: *this status code is reserved for further use.*

* `592 Status Code Out Of Range`: upstream responded with status code different than 100-999.

* `593 Not Found`: DNS lookup failed - [`EAI_NODATA`](https://github.com/libuv/libuv/blob/cdbba74d7a756587a696fb3545051f9a525b85ac/include/uv.h#L82) or [`EAI_NONAME`](https://github.com/libuv/libuv/blob/cdbba74d7a756587a696fb3545051f9a525b85ac/include/uv.h#L83).

* `594 Connection Refused`: upstream refused connection.

* `595 Connection Reset`: connection reset due to loss of connection or timeout.

* `596 Broken Pipe`: trying to write on a closed socket.

* `597 Auth Failed`: incorrect upstream credentials.

* `598 RESERVED`: *this status code is reserved for further use.*

* `599 Upstream Error`: generic upstream error.

`590` and `592` indicate an issue on the upstream side.<br/>
`593` indicates an incorrect `proxy-chain` configuration.<br/>
`594`, `595` and `596` may occur due to connection loss.<br/>
`597` indicates incorrect upstream credentials.<br/>
`599` is a generic error, where the above is not applicable.
