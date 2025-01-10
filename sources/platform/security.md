---
title: Security
description: Learn more about Apify's security practices and data protection measures that are used to protect your Actors, their data, and the Apify platform in general.
sidebar_position: 15
category: platform
slug: /security
---

# Security

**Learn more about Apify's security practices and data protection measures that are used to protect your Actors, their data, and the Apify platform in general.**

---

## SOC 2 type II compliance

Apify platform is SOC 2 Type II compliant. This means that we have undergone an independent audit to ensure that our information security practices, policies, procedures, and operations meet the SOC 2 standards for security, availability, and confidentiality of customer data.

<a href="https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2" target="_blank" title="AICPA SOC 2">
    <img src={require("./images/security/soc2-logo.png").default} width="150" title="Apify Security Whitepaper" />
</a>

To learn more read the [announcement](https://blog.apify.com/apify-soc2/) and visit our [Trust Center](https://trust.apify.com) for more information and to request a copy of our SOC 2 Type II report.

## Trust center

To learn more about Apify's security practices, data protection measures, and compliance certifications, visit our [Trust Center](https://trust.apify.com). Trust Center includes:

- List of our security certifications and compliance reports
- Information about Apify's data protection controls
- List of Apify's data subprocessors
- AI Chatbot for answering your questions about security

## Security whitepaper

At Apify, security is the top priority of our daily work. Security best practices are reflected in our development, deployment, monitoring, and project management processes.
Read the Apify Security Whitepaper for a full description of Apify's measures and commitments to security:

<a href="https://apify.com/security-whitepaper.pdf" target="_blank" title="Apify Security Whitepaper">
    <img src={require("./images/security/whitepaper-cover.png").default} width="50%" title="Apify Security Whitepaper" />
</a>

## Reporting a vulnerability

If you notice or suspect a potential security breach, please report this immediately to our security team at [security@apify.com](mailto:security@apify.com), including all the technical details.

The total compensation for your report will be highly dependent on the severity, complexity, and exploitability of the vulnerability. Your reports are always verified by our internal security team,
which also weighs in on various risks associated with that vulnerability and how major of an impact it would have in case we were attacked.

We strive to reply to all reports within 5 working days. However, depending on the complexity of the issue or our current workload, our response might take longer.

## Securing your data

The Apify platform provides you with multiple ways to secure your data. This includes [encrypted environment variables](./actors/development/programming_interface/environment_variables.md) to store your configuration secrets and [encrypted input](./actors/development/actor_definition/input_schema/secret_input.md) to secure the input parameters of your Actors.
