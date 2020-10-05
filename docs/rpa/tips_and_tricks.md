---
title: Tips and tricks
description: Learn how to make your automated processes more effective. Avoid common RPA pitfalls and improve your processes.
paths:
    - rpa/tips-and-tricks
---

# [](./tips-and-tricks) RPA tips and tricks

This collection of [robotic process automation]({{@link rpa.md}}) (RPA) tips and tricks is a work in progress. Here, we aim to collect useful advice on how you can make your automations work smoother and produce fewer errors. 

## [](#event-bound-flows) Event-bound flows

Always strive to make automation as fluid as possible. Listen to events and react to them as needed by triggering consecutive actions immediately.

- **Avoid** any **fixed-duration** delays wherever possible.
- Prefer fluid flow based on the **occurrence of events**.

```javascript
await page.waitForTimeout(timeout) ⇒ await page.waitForFunction(function, options, args);
await page.waitForTimeout(timeout) ⇒ await page.waitForFunction(() => window.location.href.includes('path'));
await page.waitForTimeout(timeout) ⇒ await page.waitForFunction(selector => document.querySelector(selector).innerText, {polling: 'mutation'}, '[data-qa="btnAppleSignUp"]');
```

## [](#proofs-and-verification) Proofs and verification

**Absence of evidence ≠ evidence of absence**.

Make sure output remains consistent regardless of any changes at the target host/website:

- Always base all important checks on the **PRESENCE** of a proof.
- Never build any important checks on the **ABSENCE** of anything.

The absence of an expected element or message does NOT prove an action has been (un)successful. The website might have been updated or expected content may no longer exist in the original form. The **action relying on the absence** of something **might still be failing** and must instead rely on a proof of presence as opposed to something expected missing.

**Good**: Outcome relies on the presence of an element or other content confirming a successful action

```javascript
try {
	await page.waitForSelector('#PaymentAccepted');
} catch (error) {
	return OUTPUT.paymentFailure;
}

return OUTPUT.paymentSuccess;
```

**Avoid**: The example below relies on the absence of an element that may have been simply updated or changed.

```javascript
const $paymentAmount = await page.$('#PaymentAmount');
if (!$paymentAmount) return OUTPUT.paymentSuccess;
```


## Presumption of failure

> Every action has failed until it has provably succeeded

Always **assume an action has failed** before having a **proof of success**.

Always **verify important steps** to avoid false positives or false negatives.

- false ***positive*** = **false / failed** outcome **reported as true / successful** on output
- false ***negative*** = **true / successful** outcome **reported as false / failed** on output

**Assuming** any action has been **successful without direct proof** to that end is **dangerous**. **Disprove failure** actively through **proof of success** instead and only then consider output valid and verified.

```javascript
await Promise.all([
	page.click('submitPayment'),
	page.waitForNavigation()
])

return OUTPUT.paymentSuccess;
```

- [ ]  Outcome has not been verified and could have easily failed despite output claiming otherwise

```javascript
await Promise.all([
	page.click('submitPayment'),
	page.waitForNavigation()
])

try {
	await page.waitForFunction(selector => 
		document.querySelector(selector).innerText.includes('Payment Success'), 
		{polling: 'mutation'}, '#PaymentOutcome');
} catch (error) {
	return OUTPUT.paymentFailure;
}

return OUTPUT.paymentSuccess;
```

✔️ Outcome has been verified through a proof and clearly disproved failure of an important action

$~$

## Targeting elements

> Be both as specific and as generic as possible at the same time...

### DOM element selectors

Make sure selectors have the best chance to remain valid after a website has been updated:

- prefer **higher specificity** selectors over lower specificity ones (#id over .class)
- use **attribute selectors** to search parts of attributes (prefix, suffix etc.)
- use element attributes with the **lowest probability of a future change**
- completely **avoid or strip** selectors of values that are clearly **random**
- completely **avoid or strip** selectors of values that are clearly **flexible**
- **extend low specificity** selectors to reduce probability of **collisions**

$~$
$$Examples$$

```jsx
*#P_L_v201w3_t3_ReceiptToolStripLabel* ⇒ **a[id*="ReceiptToolStripLabel"]**
```

... or in case:

- you are reasonably confident the page layout will remain without any dramatic future changes

and

- need to increase the selector specificity to reduce the chance of a collision with other selectors

```jsx
*#ReceiptToolStripLabel_P_L_v201w3_t3* ⇒ **table li > a[id^="ReceiptToolStripLabel"]**
```

[Attribute selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors)

### Content pattern matching

Matching elements by content is already natively supported by MS Playwright. You can use custom utility functions to polyfill this functionality in Puppeteer

TODO