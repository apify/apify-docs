---
title: Limits
description: View default resource limits for the Apify platform, including max memory, disk size, and number of Actors and tasks per user per plan tier.
sidebar_position: 16
category: platform
slug: /limits
---

The tables below demonstrate the Apify platform's default resource limits. For API limits such as rate limits and max payload size, see the [API documentation](/api/v2#rate-limiting).

## Actor runtime limits

<table>
    <thead>
    <tr>
        <th rowspan="2">Description</th>
        <th colspan="4">Limit for plan</th>
    </tr>
    <tr>
        <th>Free</th>
        <th>Starter</th>
        <th>Scale</th>
        <th>Business</th>
    </tr>
    </thead>
    <tbody>
        <tr>
            <td>Build memory size</td>
            <td colspan="4">4,096&nbsp;MB</td>
        </tr>
        <tr>
            <td>Run minimum memory</td>
            <td>128&nbsp;MB</td>
            <td colspan="3">128&nbsp;MB</td>
        </tr>
        <tr>
            <td>Run maximum memory</td>
            <td>8,192&nbsp;MB</td>
            <td colspan="3">32,768&nbsp;MB</td>
        </tr>
        <tr>
            <td>Maximum combined memory of all running jobs</td>
            <td>8,192&nbsp;MB</td>
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

## Apify platform limits

<table>
    <thead>
    <tr>
        <th rowspan="2">Description</th>
        <th colspan="4">Limit for plan</th>
    </tr>
    <tr>
        <th>Free</th>
        <th>Starter</th>
        <th>Scale</th>
        <th>Business</th>
    </tr>
    </thead>
    <tbody>
        <tr>
            <td>Maximum number of dataset columns for tabular formats (XLSX, CSV, ...)</td>
            <td colspan="4">2000&nbsp;columns</td>
        </tr>
        <tr>
            <td>Maximum size of Actor input schema</td>
            <td colspan="4">500&nbsp;kB</td>
        </tr>
        <tr>
            <td>Maximum number of Actors per user</td>
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
            <td>Maximum number of Actors per schedule</td>
            <td colspan="4">10</td>
        </tr>
        <tr>
            <td>Maximum number of tasks per schedule</td>
            <td colspan="4">10</td>
        </tr>
        <tr>
            <td>Maximum number of concurrent Actor runs per user </td>
            <td>25</td>
            <td>32</td>
            <td>128</td>
            <td>256</td>
        </tr>
    </tbody>
</table>

## Usage limit

To protect you from accidental overspending, the Apify platform introduces usage limits based on your billing plan. For details, see [Limits](./console/billing.md#limits).

## Increase limits

On paid accounts, there's an option to increase the Actor runtime limits and Apify platform limits. For details, [contact support](http://apify.com/contact).
