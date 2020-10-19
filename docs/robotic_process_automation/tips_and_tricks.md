---
title: Tips and tricks
description: Learn how to make your automated processes more effective. Avoid common RPA pitfalls, future-proof your programs and improve your processes.
paths:
    - robotic-process-automation/tips-and-tricks
---

# [](./tips-and-tricks) RPA tips and tricks

This collection of [robotic process automation]({{@link robotic_process_automation.md}}) (RPA) tips and tricks aims to help you make your automations work smoother and produce fewer errors.

## [](#event-bound-flows) Event-bound flows

Always strive to make automation as fluid as possible. Listen to events and react to them as needed by triggering consecutive actions immediately.

- **Avoid** any **fixed-duration** delays wherever possible.
- Prefer fluid flow based on the **occurrence of events**.

```javascript
// Avoid: 
await page.waitForTimeout(timeout);

// Good:
await page.waitForFunction(function, options, args);

// Good:
await page.waitForFunction(() => {
    window.location.href.includes('path'));
};

// Good:
await page.waitForFunction(selector => {
    document.querySelector(selector).innerText, 
    {polling: 'mutation'},
    '[data-qa="btnAppleSignUp"]');
};
```

## [](#proofs-and-verification) Proofs and verification

**Absence of evidence ≠ evidence of absence**.

Make sure output remains consistent regardless of any changes at the target host/website:

- Always base all important checks on the **presence** of proof.
- Never build any important checks on the **absence** of anything.

The absence of an expected element or message does **not** prove an action has been (un)successful. The website might have been updated or expected content may no longer exist in the original form. The **action relying on the absence** of something might still be failing. Instead, it must rely on **proof of presence**.

**Good**: Rely on the presence of an element or other content confirming a successful action.

```javascript
try {
    await page.waitForSelector('#PaymentAccepted');
} catch (error) {
    return OUTPUT.paymentFailure;
}

return OUTPUT.paymentSuccess;
```

**Avoid**: Relying on the absence of an element that may have been simply updated or changed.

```javascript
const $paymentAmount = await page.$('#PaymentAmount');

if (!$paymentAmount) return OUTPUT.paymentSuccess;
```

## [](#presumption-of-failure) Presumption of failure

**Every action has failed until it has provably succeeded.**

Always assume an action has failed before having a proof of success. Always verify important steps to avoid false positives or false negatives.

- False positive = **false / failed** outcome reported as **true / successful** on output.
- False negative = **true / successful** outcome reported as **false / failed** on output.

Assuming any action has been successful without direct proof is dangerous. Disprove failure actively through proof of success instead. Only then consider output valid and verified.

**Good**: Verify outcome through proof. Clearly disprove failure of an important action.

```javascript
await Promise.all([
    page.click('submitPayment'),
    page.waitForNavigation()
]);

try {
    await page.waitForFunction(selector => 
        document.querySelector(selector).innerText.includes('Payment Success'), 
        {polling: 'mutation'}, '#PaymentOutcome');
} catch (error) {
    return OUTPUT.paymentFailure;
};

return OUTPUT.paymentSuccess;
```

**Avoid**: Not verifying an outcome. It can easily fail despite output claiming otherwise.

```javascript
await Promise.all([
    page.click('submitPayment'),
    page.waitForNavigation()
]);

return OUTPUT.paymentSuccess;
```

## [](#targeting-elements) Targeting elements

Be both as specific and as generic as possible at the same time.

### [](#dom-element-selectors) DOM element selectors

Make sure your [CSS selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) have the best chance to remain valid after a website is updated.

- Prefer [**higher-specificity**](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity) selectors over lower specificity ones (**#id** over **.class**).
- Use [**attribute selectors**](https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors) to search parts of attributes (prefix, suffix, etc.).
- Use element attributes with the **lowest probability of a future change**.
- Completely **avoid or strip** selectors of values that are clearly **random**.
- Completely **avoid or strip** selectors of values that are clearly **flexible**.
- **Extend low-specificity** selectors to reduce probability of **collisions**.

Below is an example of stripping away too-specific parts of a selector that are likely random or subject to change.

```javascript
#P_L_v201w3_t3_ReceiptToolStripLabel => a[id*="ReceiptToolStripLabel"]
```

If you are reasonably confident a page layout will remain without any dramatic future changes **and** need to increase the selector specificity to reduce the chance of a collision with other selectors, you can extend the selector as per the principle below.

```javascript
#ReceiptToolStripLabel_P_L_v201w3_t3 => table li > a[id^="ReceiptToolStripLabel"]
```

### [](#content-pattern-matching) Content pattern matching

Matching elements by content is already natively supported by [Playwright](https://playwright.dev/). Playwright is a [Node.js](https://nodejs.org/en/) library that allows you to automate Chromium, Firefox and WebKit with a single API.

In [Puppeteer](https://pptr.dev/), you can use custom utility functions to [polyfill](https://developer.mozilla.org/en-US/docs/Glossary/Polyfill) this functionality.
