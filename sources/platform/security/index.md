---
title: Security
description: Apify's security practices, compliance certifications, and vulnerability disclosure policy for protecting your Actors, data, and the platform.
sidebar_label: Overview
sidebar_position: 1
category: platform
slug: /security
---

Apify runs customer code and handles scraped data at scale. Platform security is built around strict tenant isolation, protection of your secrets and data, and a hardened software supply chain. This section covers how the platform is built, Apify's compliance posture, how the platform is secured, and how to report a vulnerability.

## Platform architecture

For how the platform is built - the control and execution planes, what happens during an Actor run, and how workloads stay isolated - see [Platform architecture](/security/architecture).

## SOC 2 Type II compliance

The Apify platform is SOC 2 Type II compliant. An independent audit verified that Apify's information security practices, policies, procedures, and operations comply with SOC 2 standards for security, availability, and confidentiality of customer data.

<a href="https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2" target="_blank" title="AICPA SOC 2">
    <img src={require("../images/security/soc2-logo.png").default} alt="SOC 2 Type II compliance badge" width="150" title="Apify SOC 2 Type II compliance" />
</a>

To learn more, read the [SOC 2 compliance announcement](https://blog.apify.com/apify-soc2/) and visit the [Trust Center](https://trust.apify.com) for additional information or to request the SOC 2 Type II report.

## Trust Center

To learn more about Apify's security practices, data protection measures, and compliance certifications, visit the [Trust Center](https://trust.apify.com). The Trust Center includes:

- Security certifications and compliance reports
- Data protection controls
- Data subprocessors
- AI chatbot for security questions

## Security whitepaper

For a comprehensive description of how the Apify platform is built and operated to protect your data, read the [Apify Security Whitepaper](https://apify.com/security-whitepaper.pdf).

## Shared responsibility

Security on the Apify platform is a partnership: Apify secures the platform, and you secure what you build and run on it. See the [shared responsibility model](/security/shared-responsibility) for the full division of duties and practical guidance for securing your account and workloads.

## Vulnerability disclosure {#vulnerability-disclosure-policy}

If you believe you have found a security vulnerability in the Apify platform or Apify's open-source projects, report it to [security@apify.com](mailto:security@apify.com). Good-faith research within scope is covered by safe harbor. See the [vulnerability disclosure policy](/security/vulnerability-disclosure) for the full scope, testing guidelines, and reporting process.

## Secure your data

The Apify platform gives you several ways to secure your data. Use [encrypted environment variables](/actors/development/programming-interface/environment-variables) for configuration secrets and [encrypted input](/actors/development/actor-definition/input-schema/secret-input) for Actor input parameters.
