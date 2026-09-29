---
title: Estimate how many datacenter IP addresses you need
sidebar_label: Estimate IPs
description: Estimate how many datacenter proxy IP addresses a scrape needs, compare the result with your plan, and get more with an add-on or a plan upgrade.
sidebar_position: 10.25
slug: /proxy/estimate-ip-addresses
---

Your plan includes a fixed number of [datacenter proxy](./datacenter_proxy.md) IP addresses. Before you run a large scrape, estimate how many IP addresses it needs and compare the result with your plan.

The estimate applies to datacenter proxies only. [Residential proxies](./residential_proxy.md) are billed by traffic, the [Google SERP proxy](./google_serp_proxy.md) by request, and [Unblocker](./unblocker.md) in Unblocker units, so their IP count doesn't limit you. To scrape Google Search results, use the Google SERP proxy instead of sizing datacenter IP addresses for it.

## Calculate the estimate

The number of IP addresses a scrape needs depends on how many pages you scrape from a single domain, how long one scrape can take, and how often it runs. Major websites need 10 times more.

| One scrape can take up to | Divide by |
| ------------------------- | --------- |
| A month                   | 10,000    |
| A day                     | 1,000     |
| An hour                   | 100       |

| The scrape runs every | Multiply by |
| --------------------- | ----------- |
| Month                 | 1           |
| Day                   | 10          |
| Hour                  | 100         |

To estimate the number of IP addresses:

1. Take the number of pages you need to scrape from a single domain.
1. Divide it by the value from the first table.
1. Multiply the result by the value from the second table.
1. If the target is a major website, such as CNN, multiply by 10.

## Examples

| Scenario                                                                          | Calculation                   | IP addresses |
| --------------------------------------------------------------------------------- | ----------------------------- | ------------ |
| 10,000 pages from a local e-commerce website, once a month, finished within a day | `10,000 / 1,000 * 1`          | 10           |
| 5M products from a major online marketplace, once a month, spread over the month  | `5,000,000 / 10,000 * 1 * 10` | 5,000        |
| 100 pages from each of 1,000 websites, every day, finished within a day           | `100 / 1,000 * 10`            | 1            |

Each estimate depends on its assumptions:

- The first estimate holds only if you spread the scrape across the whole day. A faster scrape needs more IP addresses.
- The second estimate seems high, but the scrape visits the same marketplace every day. [IP address rotation](./index.md#ip-address-rotation) spreads those visits across your IP addresses, so more IP addresses mean fewer visits from each one. Long-term reliable scraping of a major website needs about this many.
- The third estimate uses the number of pages per domain, not the total. Its one IP address covers all 1,000 websites. It holds only if you spread the scrape and the websites don't use Cloudflare or a similar distributed IP protection system.

## Compare the estimate with your plan

In Apify Console, go to **Billing** > **Subscription** to see how many datacenter IP addresses your plan includes, listed under **Datacenter proxies**. For the count in each proxy group, see the **Available IPs** column on the [Proxy](https://console.apify.com/proxy/groups) page.

If you need more IP addresses than your plan includes:

- On a paid plan, go to **Billing** > **Subscription**, select **Buy add-ons**, and enter the number of IP addresses in **Shared datacenter proxies**.
- Upgrade to a plan that includes more IP addresses. For the IP addresses and add-on price of each plan, see the [Apify pricing page](https://apify.com/pricing).
- For more than 1,999 additional IP addresses, [contact support](https://apify.com/contact).
- For IP addresses that only you use, ask support about [dedicated proxy groups](./datacenter_proxy.md#dedicated-proxy-groups).

## Adjust the estimate

These are rough estimates. On some websites, they can be far off. If websites don't block your scrapes, try fewer IP addresses. If you see blocking, add more.
