---
title: Unknown, any, type guards & type casting
description: Understand the "unknown" and "any" types, as well as how to use type guards to make your code safer and type casting to avoid common TypeScript compiler errors.
menuWeight: 7.6
paths:
    - switching-to-typescript/unknown-and-type-casting
---

## [](#unknown-and-type-casting) Unknown & type casting

There are two types we haven't discussed yet - `any` and `unknown`.

## [](#the-any-type) Let's talk about "any"

In the first [**Using types**]({{@link switching_to_typescript/using_types.md}}) lesson, you were briefly exposed to the `any` type, which is a special type used to represent all possible JavaScript values. By using this type, you basically tell TypeScript that you don't care, and that you want to be able to do anything with that value, even if it might cause a runtime error. Take a look at this example:

```TypeScript
// Create a variable that TypeScript will completely ignore.
// Absolutely anything can be stored in here.
let userInput: any;

// Create a variable that can only hold strings
let savedInput: string;

// Set the user input to equal a number. This is fine, because
// it can be any time.
userInput = 5;

// Set the "savedInput" to be the value of "userInput". Stored in
// "userInput" is a number, but since we told TypeScript that it's
// "any" type, an error is not thrown.
savedInput = userInput;
```

Sometimes, `any` can be useful; however, in 99% of cases it is best to avoid it as it can lead to logical errors just like the one above.

## [](#the-unknown-type) Why "unknown" is better

Just like `any`, the `unknown` type is also a special type that represents all possible JavaScript value, and all types are assignable to it. The big difference is that the TypeScript compiler won't allow any operation on values typed as `unknown`. To see this in action, we just have to change the type of `userInput` in the above code snippet from `any` to `unknown`.

![Replacing "any" with "unknown" from the above snippet]({{@asset switching_to_typescript/images/replace-with-unknown.webp}})

Even this will result in the same error:

```TypeScript
// This results in a compiler error!
let userInput: unknown;
let savedInput: string;

userInput = 'hello world!';

savedInput = userInput;
```

## [](#type-guards) Type guards

In order to make the code above not throw any compiler errors, we can use a [type guard](https://www.typescriptlang.org/docs/handbook/advanced-types.html), which is just a check that happens at runtime to ensure that the type is in fact what it should be.

```TypeScript
let userInput: unknown;
let savedInput: string;

userInput = 5;

// This if statement is called a "type guard"
// No more error! TypeScript is smart enough to understand
// what this if statement is doing, and removes the error
if (typeof userInput === 'string') {
    savedInput = userInput;
}
```

This works, and in fact, it's the most optimal solution for this use case. But what if we were 100% sure that the value stored in `userInput` was a string? Thats when **type casting** comes in handy.

## [](#type-casting) Type casting

Despite the fancy name, [type casting](https://www.typescripttutorial.net/typescript-tutorial/type-casting/) is a simple concept based around a single keyword: `as`. We usually use this on values that we can't control the return type of, or values that we're sure have a certain type, but TypeScript needs a bit of help understanding that.

```TypeScript
let userInput: unknown;
let savedInput: string;

userInput = 'hello world!';

// No more error! We've told TypeScript to treat "userInput"
// as a string, despite the fact that its original type is
// the "unknown" type
savedInput = userInput as string;
```

## [](#final-thoughts) Final thoughts

Even though you've learned about them in the same lesson, type guards and type casting are inherently very different things with different use cases.

**Type guards** make a runtime check of whether or not a value passes a check that determines that it can be safely used as a certain type. They are great when dealing with values that might hold inconsistent data types (such as user input) where you aren't 100% sure if a certain property will exist.

**Type casting** tells TypeScript to take a value of one type and to treat it as if it were another type. No runtime checks are made. A common use case is casting the response body of an API call (usually has the `any` type depending on what you're using to fetch the data) to a custom type to receive TypeScript support on the data.

Often times, these features are used in tandem.

## [](#next) Next up

some content
