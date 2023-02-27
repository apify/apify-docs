---
title: Connection settings
description: Learn how to connect your application to Apify Proxy. See the required parameters such as the correct username and password.
sidebar_position: 10.1
slug: /proxy/connection-settings
---

# Connection settings

**Learn how to connect your application to Apify Proxy. See the required parameters such as the correct username and password.**

---

Below are the HTTP proxy connection settings for Apify Proxy.

| Parameter           | Value / explanation                                                                                                                                                                                                                                                                                                                                        |
|---------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Proxy type          | `HTTP`                                                                                                                                                                                                                                                                                                                                                     |
| Hostname            | `proxy.apify.com`                                                                                                                                                                                                                                                                                                                                          |
| Port                | `8000`                                                                                                                                                                                                                                                                                                                                                     |
| Username            | Specifies the proxy parameters such as groups, [session](./index.md) and location. <br/>See [username parameters](#username-parameters) below for details. <br/>**Note**: this is not your Apify username.                                                                                                                                |
| Password            | Proxy password. Your password is displayed on the [Proxy](https://console.apify.com/proxy) page in the Apify Console. <br/>In Apify [actors](../actors/index.md), it is passed as the `APIFY_PROXY_PASSWORD` <br/>environment variable.<br/>See the [environment variables docs](../actors/development/environment_variables.md) for more details. |
| Connection URL      | `http://<username>:<password>@proxy.apify.com:8000`                                                                                                                                                                                                                                                                                                        |
| Static IP Addresses | `18.208.102.16`, `35.171.134.41` Static IP addresses, <br/>that can be used as alternatives to `Hostname`.                                                                                                                                                                                                                                                 |


**WARNING:** All usage of Apify Proxy with your password is charged towards your account. Do not share the password with untrusted parties or use it from insecure networks – **the password is sent unencrypted** due to the HTTP protocol's [limitations](https://www.guru99.com/difference-http-vs-https.html).

## Username parameters

The `username` field enables you to pass parameters like **[groups](#proxy-groups)**, **[session](./index.md) ID** and **country** for your proxy connection.

For example, if you're using [datacenter proxies](./datacenter_proxy/index.md) and want to use the `new_job_123` session using the `SHADER` group, the username will be:

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

To learn more about [sessions](./index.md#sessions) and [IP address rotation](./index.md#ip-address-rotation), see the [proxy overview page](./index.md).

## Code examples

We have code examples for connecting to our proxy using the [Apify SDK](/sdk/js) and [Crawlee](https://crawlee.dev/) and other JavaScript libraries (**axios** and **got-scraping**), as well as examples in Python and PHP.

* [Datacenter proxy](./datacenter_proxy/examples.md)
* [Residential proxy](./residential_proxy/index.md)
* [Google SERP proxy](./google_serp_proxy/examples.md)

## Proxy groups

You can see which proxy groups you have access to on the [Proxy page](https://console.apify.com/proxy) in the Apify Console.

To use a specific proxy group (or multiple groups), specify it in the `username` parameter.
