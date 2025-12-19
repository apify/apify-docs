---
title: Dynamic Actor memory
description: Learn how to automatically adjust your Actor's memory based on input size and run options, so you can optimize performance and reduce costs without manual configuration.
slug: /actors/development/actor-definition/dynamic-actor-memory
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

**Learn how to automatically adjust your Actor's memory based on input size and run options, so you can optimize performance and reduce costs without manual configuration.**

---

Dynamic Actor memory allows Actor to automatically adjust its memory allocation based on the input and run options. Instead of always using a fixed memory value, Actor can use just the right amount of memory for each run.

Optimal memory usually depends on the input size:

- A small input (for example, 10 URLs) might run fine on 512 MB.
- A large input (for example, 1,000 URLs) could require 4 GB or more to run efficiently.

_Setting a single default value either wastes resources on small runs or slows down execution for large ones._ Dynamic memory solves this by calculating the required memory just before the run starts, based on the actual input and run options.

This helps:

- _Optimize performance_ for large inputs (more memory for bigger tasks).
- _Reduce costs_ for small runs (less memory when it’s not needed).
- _Provide better user experience_, so users get optimal performance without having to manually configure memory.

:::info Dynamic memory is not runtime auto-scaling.

_This feature does not change memory while the Actor is running._

Memory is calculated once, right before the run begins. Each new run (for example, when the user provides different input) starts with memory calculated by the expression.

Users can still override it manually for each run.

:::


## How is memory for a run determined?

The final memory assigned to an Actor run is determined in the following order:

1. _Run-level override (highest priority)._
  If the user explicitly sets memory when starting a run (via UI or API), this value is always used.

2. _Dynamic memory expression._
  If no run-level override is provided, the platform evaluates the dynamic memory expression defined in actor.json. The expression can use values from input and run options to calculate memory.

3. _Actor default memory._
  If no dynamic expression is defined, or if the expression fails to evaluate, the Actor falls back to its fixed default memory configured in the Actor’s UI settings.

4. _Platform limits._
  The final value is always rounded and clamped to platform-supported memory limits.

_In all cases, the memory value is finalized before the run starts and remains constant during execution._

## How to define dynamic memory expression

You can define a dynamic memory expression in your `actor.json`:

```json
{
  "defaultMemoryMbytes": "get(input, 'startUrls.length' * 1024)"
}
```

Expressions are based on [MathJS](https://mathjs.org/), extended with custom helper function `get`.


### Access run input and options

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

### Supported operations

- Arithmetic: `+`, `-`, `*`, `/`
- Math functions: `min()`, `max()`, `ceil()`, `floor()`, `round()`, `log()`, `exp()`, `log10()`
- Conditional logic:

    ```js
    condition ? valueIfTrue : valueIfFalse
    ```

- Variable assignment:

    ```js
    memoryPerUrl = 64;
    get(input, 'startUrls') * memoryPerUrl
    ```

### Custom `get()` function

Use `get()` to safely read nested properties or provide fallback values:

```js
get(obj, 'path.to.property', defaultValue)
```

Examples:

```js
// Safely get array length
get(input, 'startUrls.length', 1) // returns length or 1 if undefined

// Safely get nested property
get(input, 'foo.bar.baz') // safely access nested objects

// Fallback
get(input, 'foo', 1024) // returns 1024 if 'foo' doesn't exist

// Safely get an array element
get(input, 'numbers.1') // element at index 1 of the numbers array
```

### Memory limits

After the expression is evaluated, the memory value goes through these steps:

1. The result is rounded to the nearest power of two

    - 300 -> 256 MB
    - 900 → 1024 MB
    - 3,600 → 4096 MB

1. If the Actor has minimum or maximum memory limits defined (`minMemoryMbytes` / `maxMemoryMbytes`), the value is adjusted to stay within those limits.
1. The value is adjusted to stay within platform limits (128 MB to 32 GB).

:::info Fallback value
If the calculation results in an error, the Actor will start with a fixed default memory, which can be configured in the Actor's UI settings.
:::

### Example expressions

<Tabs groupId="example-expressions">
<TabItem value="URL count" label="URL count">
  This expression calculates memory based on the number of URLs you want to process.  
  It multiplies the number of URLs by 512 MB, so more URLs automatically get more memory.

  ```js
  get(input, 'startUrls.length', 1) * 512
  ```

  Explanation:

- `get(input, 'startUrls.length', 1)` → Safely reads length of `startUrls` array; defaults to 1 if not provided.
- Allocates 512 MB per URL.

</TabItem>
<TabItem value="Conditional logic" label="Conditional logic">

  You can adjust memory based on a condition, for example user wants detailed scraping.

  ```js
  get(input, 'scrapeDetailed', false) ? 4096 : 1024
  ```

  Explanation:

- `get(input, 'scrapeDetailed', false)` → Reads a boolean flag from `input`; defaults to `false`.
- `? 4096 : 1024` → If `scrapeDetailed` is `true`, allocate 4096 MB; otherwise, allocate 1024 MB.

</TabItem>
<TabItem value="Variable assignment" label="Variable assignment">

  For more complex cases, you can assign intermediate variables to simplify calculations.

  ```js
  urlsCount = get(input, 'startUrls.length', 0);
  reviewsMultiplier = max(get(input, 'maxReviews', 1) / 10, 1);
  urlsCount * reviewsMultiplier * 128
  ```

  Explanation:

- `urlsCount` → Number of URLs to process.
- `reviewsMultiplier` → Adjusts memory based on the number of reviews; ensures at least 1.
- `urlsCount * reviewsMultiplier * 128` → Final memory allocation, scaling with both URLs and review count.

</TabItem>
<TabItem value="Double-brace variables" label="Double-brace variables">

  You can also use double-brace syntax to refer to input variables.

  ```js
  {{input.itemsToProcess}} * 64
  ```

  Explanation:

- `{{input.itemsToProcess}}` → Reads the number of items to process.
- Allocates 64 MB per item.
</TabItem>

</Tabs>

### Testing expressions

#### Use npm package

You can use the [actor-memory-expressions](https://www.npmjs.com/package/@apify/actor-memory-expression) npm package not only to calculate memory for your expression, but also to write unit tests and verify the behavior of your expressions locally.

```bash
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

```bash
apify actor calculate-memory --input ./input.json --maxTotalChargeUsd=25
```
