---
title: Connection settings
description: Learn how to connect your application to Apify Proxy. See the required parameters such as the correct username and password.
menuWeight: 10.1
paths:
    - proxy/connection-settings
---

# [](#connection-settings) Connection settings

Below are the HTTP proxy connection settings for Apify Proxy.

| Parameter      | Value / explanation |
|----------------|---------------------|
| Proxy type     | `HTTP`              |
| Hostname       | `proxy.apify.com`   |
| Port           | `8000`              |
| Username       | Specifies the proxy parameters such as groups, [session]({{@link proxy.md#sessions}}) and location. <br/>See [username parameters](#username-parameters) below for details. <br/>**Note**: this is not your Apify username. |
| Password       | Proxy password. Your password is displayed on the [Proxy](https://my.apify.com/proxy) page in the Apify app. <br/>In Apify [actors]({{@link actors.md}}), it is passed as the `APIFY_PROXY_PASSWORD` <br/>environment variable.<br/>See the [environment variables docs]({{@link actors/development/environment_variables.md}}) for more details. |
| Connection URL | `http://<username>:<password>@proxy.apify.com:8000`|

**WARNING:** All usage of Apify Proxy with your password is charged towards your account. Do not share the password with untrusted parties or use it from insecure networks – **the password is sent unencrypted** due to the HTTP protocol's [limitations](https://www.guru99.com/difference-http-vs-https.html).

## [](#username-parameters) Username parameters

The `username` field enables you to pass parameters like **[group](#proxy-groups)**, **[session]({{@link proxy.md#sessions}}) ID** and **country** for your proxy connection.

For example, if you're using [datacenter proxies]({{@link proxy/datacenter_proxy.md}}) and want to use the `new_job_123` session using the `SHADER` group, the username will be:

    groups-SHADER,session-new_job_123

The table below describes the available parameters.

<table class="table table-bordered table-condensed">
    <tbody>
    <tr>
        <th><code>groups</code></th>
        <td>
            Set proxied requests to use servers from the selected groups.
            <br/>Set to <code>groups-{group name}</code> or <code>auto</code> when using datacenter proxies.
            <br/>Set to <code>groups-RESIDENTIAL</code> when using residential proxies.
            <br/>Set to <code>groups-GOOGLE_SERP</code> when using residential proxies.
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

If you do not want to specify either `groups` or `session` parameters and therefore use **default** behavior for both, set the username to `auto`.

To learn more about [sessions]({{@link proxy.md#sessions}}) and [IP address rotation]({{@link proxy.md#ip-address-rotation}}), see the proxy overview [page]({{@link proxy.md}}).

## [](#connection-examples) Connection examples

* [Datacenter proxy]({{@link proxy/datacenter_proxy/examples.md}})

* [Residential proxy]({{@link proxy/residential_proxy.md#connecting-to-residential-proxy}})

* [Google SERP proxy]({{@link proxy/google_serp_proxy/examples.md}})

## [](#proxy-groups) Proxy groups

You can see which proxy groups you have access to on the [Proxy page](https://my.apify.com/proxy) in the Apify app.

To use a specific proxy group (or multiple groups), specify it in the `username` parameter.
