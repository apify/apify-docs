---
title: Postman
description: Learn about Postman, a simple yet super valuable tool for testing requests and proxies when building scalable web scrapers.
menuWeight: 6.1
paths:
    - glossary/postman
---

# What is Postman?

[Postman](https://www.postman.com/) is a powerful collaboration platform for API development and testing. For scraping use-cases, it's mainly used to test requests and proxies (such as checking the response body of a raw request, without loading any additional resources such as JavaScript or CSS). This tool can do much more than that, but we will not be discussing all of its capabilities here. Postman allows us to easily test requests with cookies, headers, and payloads so that we can be entirely sure what the response looks like for a request URL we plan to eventually use in a scraper.

The desktop app can be downloaded from its [official download page](https://www.postman.com/downloads/), or the web-app can be used with a simple signup - no download required. If this is your first time working with a tool like Postman, we recommend checking out their [Getting Started guide](https://learning.postman.com/docs/getting-started/introduction/).

## [](#understanding-the-interface) Understanding the interface

![A basic outline of Postman's interface]({{@asset glossary/images/postman-interface.webp}})

There are four main sections to get familiar when starting out with Postman:

### Tabs

Multiple test endpoints/requests can be opened at one time, each of which will be held within its own tab.

### Address bar

The section in which you select the type of request to send, the URL of the request, and of course, send the request with the **Send Request** button.

### Request options

This is a very useful section where you can view and edit structured query parameters, as well as specify any authorization parameters, headers, or payloads.

### Response

After sending a request, the response's body will be found here, along with its cookies and headers. The response body can be viewed in various formats - **Pretty-Print**, **Raw**, or **Preview**.

## [](#using-proxies) Using and testing proxies

In order to use a proxy, the proxy's server and configuration must be provided in the **Proxy** tab in Postman settings.

![Proxy configuration in Postman settings]({{@asset glossary/images/postman-proxy.webp}})

After configuring a proxy, the next request sent will attempt to use it. To switch off the proxy, its details don't need to be deleted. The **Add a custom proxy configuration** option in settings just needs to be un-ticked to disable it.

## [](#managing-cookies) Managing the cookies cache

Postman keeps a cache of the cookies from all previous responses of a certain domain, which can be a blessing, but also a curse. Sometimes, you might notice that a request is going through just fine with Postman, but that your scraper is being blocked.

More often than not in these cases, the reason is because the endpoint being reached requires a valid `cookie` header to be present when sending the request, and because of Postman's cache, it is sending a valid cookie within each request's headers, while your scraper is not. Another reason this may happen is because you are sending Postman requests without a proxy (using your local IP address), while your scraper is using a proxy that could potentially be getting blocked.

In order to check whether there are any cookies associated with a certain request are cached in Postman, click on the **Cookies** button in any opened request tab:

![Button to view the cached cookies]({{@asset glossary/images/postman-cookies-button.webp}})

Clicking on this button opens a **MANAGE COOKIES** window, where a list of all cached cookies per domain can be seen. If we had been previously sending multiple requests to **<https://github.com/apify>**, within this window we would be able to easily find cached cookies associated with github.com. Cookies can also be easily edited (to update some specific values), or deleted (to send a "clean" request without any cached data) here.

![Managing cookies in Postman with the "MANAGE COOKIES" window]({{@asset glossary/images/postman-manage-cookies.webp}})

### [](#alternatives) Some alternatives to Postman

- [Hoppscotch](https://hoppscotch.io/)
- [Insomnia](https://insomnia.rest/download)
- [Testfully](https://testfully.io/)
