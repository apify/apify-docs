---
title: Shared responsibility model
description: How security responsibilities are divided between Apify and customers across the platform, your account, your Actors, and the data you collect.
sidebar_label: Shared responsibility
sidebar_position: 3
category: platform
slug: /security/shared-responsibility
---

Security on the Apify platform is a partnership. Apify is responsible for the security of the platform: the infrastructure, the runtime, and the platform services. Customers are responsible for security on the platform: their identities, their code, their data, and how they use it. A few areas require action from both sides.

| Area | Apify | Shared | Customer |
| --- | :---: | :---: | :---: |
| Physical infrastructure and data centers | ✅ | | |
| Network infrastructure | ✅ | | |
| Hosts and operating systems | ✅ | | |
| Actor runtime isolation | ✅ | | |
| Platform services (Console, API, storages, Apify Proxy) | ✅ | | |
| Platform vulnerability management and patching | ✅ | | |
| Apify-maintained Actors | ✅ | | |
| Community Actors | | ✅ | |
| Customer-built Actors | | | ✅ |
| Identity and access management | | ✅ | |
| Incident response | | ✅ | |
| Accounts, credentials, and API tokens | | | ✅ |
| Secrets and Actor configuration | | | ✅ |
| Data collected and stored | | | ✅ |
| Legal compliance of the use case | | | ✅ |
| Integrations and client endpoints | | | ✅ |

## Apify responsibility

Apify secures the platform itself. For how these controls are implemented, see the [Apify Security Whitepaper](https://apify.com/security-whitepaper.pdf).

### Physical, network, and host layers

Apify operates the platform on Amazon Web Services (AWS) in the us-east-1 region and is responsible for the security of the underlying data centers, networking, compute, and operating systems, including hardening, monitoring, and availability.

### Actor runtime isolation

Every Actor run executes in an isolated environment. Apify enforces this isolation so that one customer's runs cannot access another customer's runs, data, or credentials.

### Platform services

Apify secures Apify Console, the Apify API, storages (datasets, key-value stores, and request queues), the scheduler, and Apify Proxy. Apify encrypts traffic in transit and data at rest.

### Vulnerability management and patching

As a SaaS provider, Apify identifies and fixes vulnerabilities across the platform stack, from infrastructure to application code. Apify maintains a security program covering secure development, regular penetration testing, and a public [vulnerability disclosure policy](/security/vulnerability-disclosure). Customers do not patch anything at the platform level.

### Apify-maintained Actors

Actors published under the `apify` account in Apify Store are treated as part of the platform. Apify owns their code quality, dependencies, and security fixes.

## Customer responsibility

### Accounts, credentials, and API tokens

Use a strong password, enable two-factor authentication, and assign organization members the lowest role they need. Treat API tokens like passwords: prefer scoped tokens, never commit them to code or repositories, and rotate or revoke them when in doubt.

### Customer-built Actors

If you develop Actors, private or published, you own their security: the code, the dependencies, and the fixes. If a vulnerability is reported in an Actor you published, the fix is yours; the Apify security team can assist with coordination.

### Secrets and Actor configuration

Actor input is stored with the run, so plaintext input fields are not the place for credentials. Use the mechanisms designed for secrets:

- Mark sensitive input fields as secret (`"isSecret": true` in the input schema). Their values are encrypted and hidden in Apify Console. See [encrypted input](/actors/development/actor-definition/input-schema/secret-input).
- Store credentials for your own Actors in [secure environment variables](/actors/development/programming-interface/environment-variables).

### Data you collect and store

You control what your Actors collect and what stays in storages. Classify it, set retention, delete what you no longer need, and do not share storage IDs or public URLs of storages containing sensitive content.

### Legal compliance of your use case

You decide what to scrape and how to use the results. Compliance with applicable laws, target website terms, and data protection regulations for the data you collect is your responsibility.

### Integrations and client endpoints

Secure your webhook endpoints, validate incoming payloads, protect credentials configured in integrations, and secure the devices and systems that consume Apify data.

## Shared responsibility

### Community Actors

Actors in Apify Store built by third-party developers sit in the middle. The developer owns the code and its maintenance. Apify moderates Apify Store, enforces runtime isolation, and removes malicious Actors, but moderation is not a line-by-line audit. You choose which Actors to trust: check the developer, maintenance history, reviews, and usage before feeding an Actor production credentials or sensitive input.

### Identity and access management

Apify provides the controls: two-factor authentication, SSO, scoped tokens, organization roles, and per-resource access rights. You are responsible for turning them on and configuring them correctly, granting each member and integration the least access it needs.

### Incident response

If Apify detects an incident affecting your data, Apify investigates, contains it, and notifies you in line with contractual and legal obligations. You handle the response on your side: rotate affected credentials, notify your own users where required, and act on the guidance. In reverse, if you detect a compromise of your account or tokens, revoke them immediately and contact support via built-in chat or [support@apify.com](mailto:support@apify.com). Subscribe to [status.apify.com](https://status.apify.com) to receive notifications about incidents affecting your workloads.

## Questions

For security questions or to report a vulnerability, contact [security@apify.com](mailto:security@apify.com) or see the [security overview](/security). For general account support, contact [support@apify.com](mailto:support@apify.com).
