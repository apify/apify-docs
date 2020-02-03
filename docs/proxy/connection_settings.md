---
title: Connection settings
description: Documentation of Apify Proxy that enables anonymization of access to websites and IP rotation.
menuWeight: 7.1
---

# [](#connection-settings)Connection settings

The following table shows the HTTP proxy connection settings for the Apify Proxy.

| Parameter      | Value / explanation |
|----------------|---------------------|
| Proxy type     | `HTTP`              |
| Hostname       | `proxy.apify.com`   |
| Port           | `8000`              |
| Username       | Specifies the proxy parameters. See [username parameters]({{@link proxy/datacenter_proxy.md#username-parameters}}) below for details. **Beware that this is not your Apify username!** |
| Password       | Proxy password. Your password is displayed on the [Proxy page](https://my.apify.com/proxy) in the app. Also, in Apify actors, it is passed as the `APIFY_PROXY_PASSWORD` environment variable. See [actor documentation]({{@link actor/run.md#run-env-vars}}) for more details. |
| Connection URL | `http://<username>:<password>@proxy.apify.com:8000`|


**WARNING:** All usage of Apify Proxy with your password is charged towards your account. Do not share the password with untrusted parties or use it from insecure networks, because the password is sent unencrypted due to the limitations of the HTTP protocol.
