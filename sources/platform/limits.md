---
title: Limits
description: Learn the Apify platform's resource capability and limitations such as max memory, disk size and number of actors and tasks per user.
sidebar_position: 16
category: platform
slug: /limits
---

# Limits {#limits}

**Learn the Apify platform's resource capability and limitations such as max memory, disk size and number of actors and tasks per user.**

---

The tables below demonstrate the Apify platform's default resource limits. For API limits such as rate limits and max payload size, see the [API documentation](https://docs.apify.com/api/v2#/introduction/rate-limiting).

> If needed, the limits shown below can be increased on paid accounts. For details, contact us at **[hello@apify.com](mailto:hello@apify.com)** or using the chat in [Apify Console](https://console.apify.com/) under the "Help & Resources → Contact Support".

## Actor runtime limits {#actor-limits}

<table>
    <thead>
    <tr>
        <th rowspan="2">Description</th>
        <th colspan="4">Limit for plan</th>
    </tr>
    <tr>
        <th>Free</th>
        <th>Personal</th>
        <th>Team</th>
        <th>Enterprise</th>
    </tr>
    </thead>
    <tbody>
        <tr>
            <td>Build memory size</td>
            <td>2,048&nbsp;MB</td>
            <td colspan="3">4,096&nbsp;MB</td>
        </tr>
        <tr>
            <td>Run minimum memory</td>
            <td>128&nbsp;MB</td>
            <td colspan="3">128&nbsp;MB</td>
        </tr>
        <tr>
            <td>Run maximum memory</td>
            <td>4,096&nbsp;MB</td>
            <td colspan="3">32,768&nbsp;MB</td>
        </tr>
        <tr>
            <td>Maximum combined memory of all running jobs</td>
            <td>4,096&nbsp;MB</td>
            <td>32,768&nbsp;MB</td>
            <td colspan="2">131,072&nbsp;MB</td>
        </tr>
        <tr>
            <td>Build timeout</td>
            <td colspan="4">1800&nbsp;secs</td>
        </tr>
        <tr>
            <td>Build/run disk size</td>
            <td colspan="4">2× job memory limit</td>
        </tr>
        <tr>
            <td>Memory per CPU core</td>
            <td colspan="4">4,096&nbsp;MB</td>
        </tr>
        <tr>
            <td>Maximum log size</td>
            <td colspan="4">10,485,760&nbsp;characters</td>
        </tr>
        <tr>
            <td>Maximum number of metamorphs</td>
            <td colspan="4">10 metamorphs per run</td>
        </tr>
    </tbody>
</table>

## Apify platform limits {#platform-limits}

<table>
    <thead>
    <tr>
        <th rowspan="2">Description</th>
        <th colspan="4">Limit for plan</th>
    </tr>
    <tr>
        <th>Free</th>
        <th>Personal</th>
        <th>Team</th>
        <th>Enterprise</th>
    </tr>
    </thead>
    <tbody>
        <tr>
            <td>Maximum number of dataset columns for tabular formats (XLSX, CSV, ...)</td>
            <td colspan="4">2000&nbsp;columns</td>
        </tr>
        <tr>
            <td>Maximum size of actor input schema</td>
            <td colspan="4">100&nbsp;kB</td>
        </tr>
        <tr>
            <td>Maximum number of actors per user</td>
            <td colspan="4">100</td>
        </tr>
        <tr>
            <td>Maximum number of tasks per user</td>
            <td colspan="4">1000</td>
        </tr>
        <tr>
            <td>Maximum number of schedules per user</td>
            <td colspan="4">100</td>
        </tr>
        <tr>
            <td>Maximum number of webhooks per user</td>
            <td colspan="4">100</td>
        </tr>
        <tr>
            <td>Maximum number of actors per schedule</td>
            <td colspan="4">10</td>
        </tr>
        <tr>
            <td>Maximum number of tasks per schedule</td>
            <td colspan="4">10</td>
        </tr>
        <tr>
            <td>Maximum number of concurrent actor runs per user </td>
            <td>25</td>
            <td colspan="3">250</td>
        </tr>
    </tbody>
</table>

## Usage limit {#usage-limit}

The Apify platform also introduces usage limits based on the billing plan to protect users from accidental overspending. View these limits and adjust your maximum usage limit in [Apify Console](https://console.apify.com/billing#/limits):

 <img src={require("./images/limits/usage-limits.png").default} title="Apify Security Whitepaper" />
