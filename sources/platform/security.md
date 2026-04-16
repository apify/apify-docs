---
title: Security
description: Learn more about Apify's security practices and data protection measures that are used to protect your Actors, their data, and the Apify platform in general.
sidebar_position: 15
category: platform
slug: /security
---

## SOC 2 type II compliance

The Apify platform is SOC 2 Type II compliant. This means that we have undergone an independent audit to ensure that our information security practices, policies, procedures, and operations comply with SOC 2 standards for security, availability, and confidentiality of customer data.

<a href="https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2" target="_blank" title="AICPA SOC 2">
    <img src={require("./images/security/soc2-logo.png").default} width="150" title="Apify Security Whitepaper" />
</a>

To learn more, read the [announcement](https://blog.apify.com/apify-soc2/) and visit our [Trust Center](https://trust.apify.com) for additional information or to request a copy of our SOC 2 Type II report.

## Trust center

To learn more about Apify's security practices, data protection measures, and compliance certifications, please visit our [Trust Center](https://trust.apify.com). The Trust Center includes:

- List of our security certifications and compliance reports
- Information about Apify's data protection controls
- List of Apify's data subprocessors
- An AI chatbot to answer your security-related questions

## Security Whitepaper

At Apify, security is our top priority every day. Security best practices are reflected in our development, deployment, monitoring, and project management processes.
Read the Apify Security Whitepaper for a comprehensive description of Apify's security measures and commitments:

<a href="https://apify.com/security-whitepaper.pdf" target="_blank" title="Apify Security Whitepaper">
    <img src={require("./images/security/whitepaper-cover.png").default} width="50%" title="Apify Security Whitepaper" />
</a>

## Vulnerability disclosure policy

We invite security researchers, ethical hackers, and the broader community to help us keep Apify safe by reporting potential vulnerabilities. Your responsible disclosure helps protect our users and strengthen the Apify platform.

### Scope

The following Apify-owned services and assets are eligible for security research:

#### Platform & API

- [apify.com](https://apify.com) - marketing site and Apify Store
- [console.apify.com](https://console.apify.com) - primary web application
- [console-backend.apify.com](https://console-backend.apify.com) - backend API for the primary web application
- [api.apify.com](https://api.apify.com) - REST API
- [proxy.apify.com](https://proxy.apify.com) - managed proxy infrastructure
- [mcp.apify.com](https://mcp.apify.com) - MCP server for AI agent integrations

#### Open source projects ([github.com/apify](https://github.com/apify))

- [Crawlee](https://github.com/apify/crawlee) and [Crawlee Python](https://github.com/apify/crawlee-python)
- [Apify SDK](https://github.com/apify/apify-sdk-js) and [Apify SDK Python](https://github.com/apify/apify-sdk-python)
- [apify-client-js](https://github.com/apify/apify-client-js) and [apify-client-python](https://github.com/apify/apify-client-python)

#### Out-of-scope assets

The following are explicitly excluded from this policy:

- Third-party integrations and connectors (Make, Zapier, n8n, and similar)
- Actors published on the Apify Store by community or third-party developers
- Infrastructure or services not operated by Apify

### Priority vulnerabilities

We are especially interested in reports that demonstrate:

- Authentication and authorization bypass
- Broken access control and privilege escalation
- Cross-tenant data exposure
- Actor sandbox escape
- Server-side vulnerabilities - SSRF, RCE, SQLi, and similar
- Cross-site scripting (XSS) and injection attacks
- Sensitive data leakage
- Supply chain attacks - reports must include working exploitation steps, not only the presence of a known-vulnerable dependency
- Logic flaws impacting account integrity or billing

### Out-of-scope vulnerabilities

The following issue types are excluded and should not be submitted:

- Automated scanning and denial of service
- Security hardening best practices - missing HTTP security headers, cookie flags, TLS configuration, and DNS/email records
- Social engineering and physical attacks - phishing, physical security testing, and attacks requiring MITM or stolen credentials
- Low-impact UI and content issues - clickjacking, content spoofing, and self-XSS without a demonstrated attack vector
- Theoretical findings without proof of concept - scanner output without a working PoC, or known CVEs without demonstrated impact on Apify
- Intended platform behavior - web scraping, proxy routing, rate limiting, quota enforcement, and usage caps behaving as designed
- Third-party issues - vulnerabilities in services or software not owned or operated by Apify

### Testing guidelines

To ensure responsible research, you must:

- Use only accounts and organizations you own or control. Create a free account at [apify.com](https://apify.com) - it is sufficient for most testing.
- Only test with your own Actors, datasets, key-value stores, and storage. Do not access, read, modify, or delete data belonging to other users or organizations.
- Never disrupt production services or degrade the experience for other users. Do not perform automated scanning, fuzzing, or load generation against production infrastructure without prior written approval.
- Do not exfiltrate, alter, or destroy data. If you discover access to data you do not own, stop immediately and report it without reading or retaining it.
- Submit one vulnerability per report, unless vulnerability chaining is required to demonstrate the full impact.
- Report promptly. Do not accumulate findings or delay reporting to maximize scope.

### Safe harbor

We consider security research conducted in accordance with this policy to be authorized. We will not initiate legal action against researchers who discover and report vulnerabilities responsibly under these guidelines. If legal action is initiated by a third party against you in connection with activities conducted in compliance with this policy, we will take steps to make it known that your actions were authorized.

This policy does not grant permission to access systems outside of the defined scope, to access data belonging to other users, or to perform any action that would violate applicable law.

### How to report

Send your report to [security@apify.com](mailto:security@apify.com) with the following information:

- Clear description of the vulnerability and its potential impact
- Step-by-step reproduction instructions
- Proof of concept (screenshots, code snippets, or a working PoC)
- Affected URL, endpoint, or repository
- Your assessment of severity and impact

We will acknowledge your report within 5 business days and keep you informed as we investigate. Remediation is prioritized based on severity and complexity.

:::danger Crucial rules and legal obligations

Please adhere strictly to the following rules. Failure to do so may result in legal action:

- _Do not publicly disclose vulnerabilities until resolved._ This ensures that the issue can be properly evaluated and mitigated before being exposed to potential exploitation.
- _Treat all related information as confidential._ Any details about a vulnerability you are reporting are considered confidential information and cannot be disclosed unless explicitly approved by Apify in writing.
- _Comply with Apify legal terms._ As per our [Acceptable Use Policy](https://docs.apify.com/legal/acceptable-use-policy), you must not take any action that might cause an overload, disruption, or denial of service, result in unauthorized access to another user's data, or have a similar adverse effect on Apify's services or other users.

:::

### Recognition

This is a vulnerability disclosure policy, not a bug bounty program, and we do not guarantee monetary rewards hereunder. Any decisions regarding impact classification or potential rewards for high or critical severity issues are made at our sole discretion on case-by-case basis. Duplicate reports of the same vulnerability, including issues already identified internally, are not eligible for rewards.

## Secure your data

The Apify platform provides you with multiple ways to secure your data, including [encrypted environment variables](./actors/development/programming_interface/environment_variables.md) for storing your configuration secrets and [encrypted input](./actors/development/actor_definition/input_schema/secret_input.md) for securing the input parameters of your Actors.
