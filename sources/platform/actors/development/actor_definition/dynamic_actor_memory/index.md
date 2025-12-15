---
title: Dynamic Actor memory
description: Learn how to automatically adjust your Actor's memory based on input size and run options, so you can optimize performance and reduce costs without manual configuration..
slug: /actors/development/actor-definition/dynamic-actor-memory
---

**Learn how to automatically adjust your Actor's memory based on input size and run options, so you can optimize performance and reduce costs without manual configuration.**

---

Dynamic Actor memory allows Actors to _automatically adjust its memory allocation based on the input and run options_. Instead of always using a fixed memory value, Actor can use just the right amount of memory for each run.

This helps:

- _Optimize performance_ for large inputs (more memory for bigger tasks).
- _Reduce costs_ for small runs (less memory when it’s not needed).
- _Provide better user experience_, so users get optimal performance without having to manually configure memory.

:::info
_Important_: The memory calculated by dynamic expression is used as the default memory for the run. Users can still override it manually for each run.
:::

---

## Why dynamic memory matters

Currently, Actors often use a _static default memory_, but the optimal memory usually depends on the input:

- A small input (e.g., 10 URLs) might run fine on 512 MB.
- A large input (e.g., 1,000 URLs) could require 4 GB+ to run efficiently.

Setting a single default either _wastes resources or slows down execution_. Dynamic memory solves this by calculating memory just before the run starts.

---

## How to define dynamic memory expression

You can define a dynamic memory expression in your `actor.json`:

```json
{
  "defaultMemoryMbytes": "get(input, 'startUrls.length' * 1024)"
}
```

- The expression is evaluated _before the run starts_.
- The expression can reference variables from input and run options to calculate memory (e.g., `input.startUrls`, `runOptions.maxItems`).
- The result becomes the default memory for the run, but users can still override it.

---

### Writing Expressions

Expressions are based on [MathJS](https://mathjs.org/), extended with custom helper function `get`.

#### Variable Access

You can access variables in two ways:

1. Direct property access

```js
input.foo + 512
runOptions.maxItems + 256
```
1. Double-brace syntax

```js
{{input.foo}}
{{runOptions.maxItems}}
```

_You can mix both styles._

#### Supported Operations

- Arithmetic: `+`, `-`, `*`, `/`
- Math functions: `min()`, `max()`, `ceil()`, `floor()`, `round()`, `log()`, `exp()`, `log10()`
- Conditional logic:

```
condition ? valueIfTrue : valueIfFalse
```

- Variable assignment:

```js
memoryPerUrl = 64;
get(input, 'startUrls') * memoryPerUrl
```

#### Custom `get()` function

Use `get()` to safely read nested properties or provide fallback values:

```js
get(obj, 'path.to.property', defaultValue)
```

Examples:

```js
// Safely get array length
get(input, 'startUrls.length', 1) // returns length or 1 if undefined

// Safely get nested property
get(input, 'foo.bar.baz.count') // safely access nested objects

// Fallback
get(input, 'foo', 1024) // returns 1024 if 'foo' doesn't exist

// Safely get an array element
get(input, 'numbers.1') // element at index 1 of the numbers array
```

### Memory limits and clamping

After evaluation:

1. The result is rounded up to the nearest power of two

- 900 → 1024 MB
- 3,600 → 4096 MB
1. It is clamped to actor-defined min/max (`minMemoryMbytes` / `maxMemoryMbytes`).
2. It is clamped to platform limits (128 MB to 32 GB).

:::info
If the calculation results in an error, the Actor will start with a fixed default memory, which can be configured in the Actor's UI settings.
:::

### Example expressions

1. Simple memory based on URL count

```js
get(input, 'startUrls.length', 1) * 512
```
1. Conditional logic

```js
get(input, 'scrapeDetailed', false) ? 4096 : 1024
```
1. More complex calculation

```js
urls = get(input, 'startUrls.length', 0);
reviewsMultiplier = max(get(input, 'maxReviews', 1) / 10, 1);
urls * reviewsMultiplier * 128
```
1. Using double-brace variables

```js
{{input.itemsToProcess}} * 64
```

### Testing expressions

#### Use NPM package

You can use our [NPM package](https://www.npmjs.com/package/@apify/actor-memory-expression) not only to calculate memory for your expression, but also to write unit tests and verify the behavior of your expressions locally.

```shell
npm install @apify/actor-memory-expression
```

```js
import { calculateRunDynamicMemory } from '@apify/actor-memory-expression';

await calculateRunDynamicMemory(
  "get(input, 'urls.length', 1) * 256",
  {
    input: { urls: ["a", "b", "c"] },
    runOptions: { maxTotalChargeUsd: 10 }
  }
);
```

#### Use CLI

You can use [Apify CLI](https://docs.apify.com/cli) to quickly evaluate expressions without writing code. It supports reading input from a JSON file and passing run options as flags.

```shell
apify actor calculate-memory --input ./input.json --maxTotalChargeUsd=25
```

---

### Key Takeaways

- Dynamic memory _automatically adjusts memory_ based on input and run options.
- The result is used as default memory, but users can override it.
- Use `get()`, arithmetic, math functions, and conditional logic to define expressions.
- Test expressions locally with the NPM package or CLI.
