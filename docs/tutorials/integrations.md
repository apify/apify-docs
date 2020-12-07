---
title: Integrations
description: Learn how to connect the Apify platform with your projects. You can use our tools in cloud services like Zapier, Integromat, Keboola, and many more.
menuWeight: 3.3
paths:
    - tutorials/integrations
---

# Integrations


## [](#api-token) API token

To access our API in your integrations, you will need to use your secret API token. You can find it on the [Integrations](https://my.apify.com/account#/integrations) page in the Apify app.

![Integrations page in the Apify app]({{@asset tutorials/images/api-token.png}})

Add the secret API token to your request URL as the `token` query parameter.

```cURL
https://api.apify.com/v2/acts?token=[YOUR_TOKEN]
```

**IMPORTANT**: **Do not share the API token with untrusted parties, or use it directly from client-side code,
unless you fully understand the consequences!**

Note that some API endpoints, such as [Get list of keys](#reference/key-value-stores/key-collection/get-list-of-keys),
do not require an authentication token because they contain a hard-to-guess identifier that effectively serves as an authentication key.
