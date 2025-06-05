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

## SOC 2 Type II Compliance

The Apify platform is SOC 2 Type II compliant. This means that we have undergone an independent audit to ensure that our information security practices, policies, procedures, and operations comply with SOC 2 standards for security, availability, and confidentiality of customer data.

<a href="https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2" target="_blank" title="AICPA SOC 2">
    <img src={require("./images/security/soc2-logo.png").default} width="150" title="Apify Security Whitepaper" />
</a>

To learn more, read the [announcement](https://blog.apify.com/apify-soc2/) and visit our [Trust Center](https://trust.apify.com) for additional information or to request a copy of our SOC 2 Type II report.

## Trust Center

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

## Vulnerability Disclosure Policy

We invite security researchers, ethical hackers, and the broader community to help us keep Apify safe by reporting any potential security vulnerabilities or weaknesses. Your responsible disclosure helps protect our users and strengthen our platform.

**Scope:**  
The following Apify services and domains are eligible for security research and responsible reporting:

- [apify.com](https://apify.com)
- [console.apify.com](https://console.apify.com)
- [api.apify.com](https://api.apify.com)

Please use your own test account for research purposes. Free accounts are sufficient for most testing.

**Out-of-scope:**  

- Issues with third-party systems
- Clickjacking on non-sensitive pages
- SPF/DKIM/DMARC or other email configuration issues
- Best practices or informational findings without impact
- Denial of Service (DoS), brute-force attacks, and resource exhaustion
- Social engineering, phishing, or physical attacks
- Attacks requiring MITM or stolen credentials

**We are especially interested in reports that demonstrate:**

- Unauthorized access to data
- Elevation of privileges
- Server-side vulnerabilities (e.g., SSRF, RCE)
- Cross-site scripting (XSS) and injection attacks
- Logic flaws impacting account integrity or billing
- Authentication/authorization issues
- Data leaks due to misconfiguration

### Reporting process

If you notice or suspect a potential security issue, please report it to our security team at [security@apify.com](mailto:security@apify.com) with as much detail as possible, including the following:

- Clear description of the issue
- Step-by-step reproduction instructions
- PoC (screenshots or code snippets)
- Impact analysis
- Affected URL or endpoint

### Rules of engagement

- Only target accounts or data you control (test accounts)
- Never disrupt our services or other users
- Avoid privacy violations and do not destroy or alter data
- Automated scanners are not permitted without prior approval
- No spam, DoS, or social engineering
- Submit one vulnerability per report (unless chaining is required)

If you follow these guidelines and act in good faith, we will not take legal action against you for responsibly reporting a security issue.

:::warning

Please refrain from publicly disclosing the vulnerability until it has been resolved. This ensures that the issue can be properly evaluated and mitigated before being exposed to potential exploitation.

:::


## Securing your data

The Apify platform provides you with multiple ways to secure your data, including [encrypted environment variables](./actors/development/programming_interface/environment_variables.md) for storing your configuration secrets and [encrypted input](./actors/development/actor_definition/input_schema/secret_input.md) for securing the input parameters of your Actors.
