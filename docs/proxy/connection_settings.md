---
title: Connection settings
description: Learn how to connect your application to Apify Proxy. See the required parameters such as the correct username and password.
menuWeight: 8.1
paths:
    - proxy/connection-settings
---

# [](#connection-settings)Connection settings

The following table shows the HTTP proxy connection settings for the Apify Proxy.

| Parameter      | Value / explanation |
|----------------|---------------------|
| Proxy type     | `HTTP`              |
| Hostname       | `proxy.apify.com`   |
| Port           | `8000`              |
| Username       | Specifies the proxy parameters. See [username parameters]({{@link proxy/datacenter_proxy.md#username-parameters}}) below for details. <br/>**Beware that this is not your Apify username!** |
| Password       | Proxy password. Your password is displayed on the [Proxy page](https://my.apify.com/proxy) in the app. <br/>Also, in Apify actors, it is passed as the `APIFY_PROXY_PASSWORD` <br/>environment variable. See [actor documentation]({{@link actors/development/environment_variables.md}}) for more details. |
| Connection URL | `http://<username>:<password>@proxy.apify.com:8000`|


**WARNING:** All usage of Apify Proxy with your password is charged towards your account. Do not share the password with untrusted parties or use it from insecure networks, because the password is sent unencrypted due to the limitations of the HTTP protocol.
