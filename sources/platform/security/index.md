---
title: Security
description: Apify's security practices, compliance certifications, and vulnerability disclosure policy for protecting your Actors, data, and the platform.
sidebar_label: Overview
sidebar_position: 1
category: platform
slug: /security
---

Apify runs customer code and handles scraped data at scale, so platform security is built around strict tenant isolation, protection of your secrets and data, and a hardened software supply chain. This section covers our compliance posture, how the platform is secured, and how to report a vulnerability.

## SOC 2 Type II compliance

The Apify platform is SOC 2 Type II compliant. This means that we have undergone an independent audit to ensure that our information security practices, policies, procedures, and operations comply with SOC 2 standards for security, availability, and confidentiality of customer data.

<a href="https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2" target="_blank" title="AICPA SOC 2">
    <img src={require("../images/security/soc2-logo.png").default} width="150" title="Apify SOC 2 Type II compliance" />
</a>

To learn more, read the [announcement](https://blog.apify.com/apify-soc2/) and visit our [Trust Center](https://trust.apify.com) for additional information or to request a copy of our SOC 2 Type II report.

## Trust Center

To learn more about Apify's security practices, data protection measures, and compliance certifications, visit our [Trust Center](https://trust.apify.com). The Trust Center includes:

- List of our security certifications and compliance reports
- Information about Apify's data protection controls
- List of Apify's data subprocessors
- An AI chatbot to answer your security-related questions

## Security whitepaper

For a comprehensive description of how the Apify platform is built and operated to protect your data, read the [Apify Security Whitepaper](https://apify.com/security-whitepaper.pdf).

## Shared responsibility

Security on the Apify platform is a partnership: Apify secures the platform, and you secure what you build and run on it. See the [shared responsibility model](./shared-responsibility.md) for the full division of duties and practical guidance for securing your account and workloads.

## Vulnerability disclosure {#vulnerability-disclosure-policy}

If you believe you have found a security vulnerability in the Apify platform or Apify's open-source projects, report it to [security@apify.com](mailto:security@apify.com). Good-faith research within scope is covered by safe harbor. See the [vulnerability disclosure policy](./vulnerability-disclosure.md) for the full scope, testing guidelines, and reporting process.

## Secure your data

The Apify platform provides you with multiple ways to secure your data, including [encrypted environment variables](../actors/development/programming_interface/environment_variables.md) for storing your configuration secrets and [encrypted input](../actors/development/actor_definition/input_schema/secret_input.md) for securing the input parameters of your Actors.
