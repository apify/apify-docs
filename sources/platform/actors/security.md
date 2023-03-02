---
title: Security
description: Learn more about Apify's security practices and data protection measures that are used to protect your actors, their data, and the Apify platform in general.
sidebar_position: 7.7
slug: /actors/security
---

# Security

**Learn more about Apify's security practices and data protection measures that are used to protect your actors, their data, and the Apify platform in general.**

---

## Security Whitepaper

At Apify, security is the top priority of our daily work. Security best practices are reflected in our development, deployment, monitoring, and project management processes.
Read the Apify Security Whitepaper for a full description of Apify's measures and commitments to security:

<a href="https://apify.com/security-whitepaper.pdf" target="_blank" title="Apify Security Whitepaper">
    <img src={require("./images/security/whitepaper-cover.png").default} width="50%" title="Apify Security Whitepaper" />
</a>

## Reporting a vulnerability

If you notice or suspect a potential security breach, please report this immediately to our security team at [security@apify.com](mailto:security@apify.com), including all the technical details.


The total compensation for your report will be highly dependent on the vulnerability's severity, complexity, and exploitability. Our internal security team always verifies your reports.
We also factor in various risks associated with that vulnerability and the significance of its impact if we experience an attack.

We strive to reply to all reports within 5 working days. However, depending on the complexity of the issue or our current workload, our response might take longer.

## Securing your data

The Apify platform provides multiple ways to secure your data. This includes [encrypted environment variables](./development/environment-variables) to store your configuration secrets and [encrypted input](./development/secret-input) to secure the input parameters of your actors.
