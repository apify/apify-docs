---
title: Connection settings
description: Learn how to connect your application to Apify Proxy. See the required parameters such as the correct username and password.
menuWeight: 7.1
paths:
    - proxy/connection-settings
---

# [](#connection-settings) Connection settings

The following table shows the HTTP proxy connection settings for the Apify Proxy.

| Parameter      | Value / explanation |
|----------------|---------------------|
| Proxy type     | `HTTP`              |
| Hostname       | `proxy.apify.com`   |
| Port           | `8000`              |
| Username       | Specifies the proxy parameters. See [username parameters](#username-parameters) below for details. <br/>**Note**: this is not your Apify username. |
| Password       | Proxy password. Your password is displayed on the [Proxy](https://my.apify.com/proxy) page in the Apify app. <br/>In Apify actors, it is passed as the `APIFY_PROXY_PASSWORD` <br/>environment variable.<br/>See the [documentation]({{@link actors/development/environment_variables.md}}) for more details. |
| Connection URL | `http://<username>:<password>@proxy.apify.com:8000`|

**WARNING:** All usage of Apify Proxy with your password is charged towards your account. Do not share the password with untrusted parties or use it from insecure networks, because the password is sent unencrypted due to the limitations of the HTTP protocol.

## [](#username-parameters) Username parameters

The **username** field enables you to pass parameters for your proxy connection.

For example, if you're using [datacenter proxies]({{@link proxy/datacenter_proxy.md}}), the username can be:

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
             <br/> from the SHADER group located in the USA.
            <br /><strong>This parameter is optional</strong>.
            By default, the proxy uses all available
            <br/>proxy servers from all countries.
        </td>
    </tr>
    </tbody>
</table>

If you do not want to specify either **groups** or **session** parameters and therefore use **default** behavior for both, set the username to **auto**.