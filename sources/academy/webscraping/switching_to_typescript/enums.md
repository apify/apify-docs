---
title: Enums
description: Learn how to easily define, use, and manage constant values using a cool feature called "enums" that TypeScript brings to the table.
sidebar_position: 7.4
slug: /switching-to-typescript/enums
---

# Enums! {#enums}

**Learn how to easily define, use, and manage constant values using a cool feature called "enums" that TypeScript brings to the table.**

---

Enums are a nice feature offered by TypeScript that can be used to create automatically enumerated global constant identifiers that can also be used as custom types. We've dedicated an entire lesson to enums because they're a new feature brought into JavaScript by TypeScript, and because they can be quite useful in certain projects.

## Let's talk about constants {#lets-talk-about-constants}

If you've followed along with any of the more advanced courses in the Apify academy, or at least read the [Best practices](../web_scraping_for_beginners/best_practices.md) lesson in the **Web scraping for beginners** course, you'll definitely be familiar with the idea of constant variables. In a nutshell, we create constant variables for values that will never change, and will likely used in multiple places. The naming convention for constants is **ALL_CAPS_AND_UNDERSCORED**.

Here's an object of constant values that we've prepared for use within our project.

```ts
const fileExtensions = {
    JAVASCRIPT: '.js',
    TYPESCRIPT: '.ts',
    RUST: '.rs',
    PYTHON: '.py',
};
```

No problem, this will totally work; however, the issue is that TypeScript doesn't know what these values are - it infers them to just be strings. We can solve this by adding a type annotation with a custom type definition:

```ts
// Since TypeScript infers these values to be just strings,
// we have to create a type definition telling it that these
// properties hold super specific strings.
const fileExtensions: {
    JAVASCRIPT: '.js';
    TYPESCRIPT: '.ts';
    RUST: '.rs';
    PYTHON: '.py';
// Define the object's values
} = {
    JAVASCRIPT: '.js',
    TYPESCRIPT: '.ts',
    RUST: '.rs',
    PYTHON: '.py',
};

// Or, we can just do this
const fileExtensions = {
    JAVASCRIPT: '.js',
    TYPESCRIPT: '.ts',
    RUST: '.rs',
    PYTHON: '.py',
} as const;
```

> Using an actual concrete value such as `'.js'` or `24` or something else instead of a type name is called a [literal type](https://www.typescriptlang.org/docs/handbook/literal-types.html).

And now we'll create a variable with a hacky custom type that points to the values in the `fileExtensions` object:

![TypeScript autofilling the values of the fileExtensions object](./images/constant-autofill.png)

Because of the custom type definition for `fileExtensions` and the type annotation used for the `values` variable, we are getting some autofill for the variable, and the variable can only be set to values within the `fileExtensions` object. Though this implementation works, TypeScript offers a unique new feature called **enums** that was designed just for these use cases.

## Creating enums {#creating-enums}

The [`enum`](https://www.typescriptlang.org/docs/handbook/enums.html) keyword is a new keyword brought to us by TypeScript that allows us the same functionality we implemented in the above section, plus more. To create one, simply use the keyword followed by the name you'd like to use (the naming convention is generally **CapitalizeEachFirstLetterAndSingular**).

```ts
enum FileExtension {
    // Use an "=" sign instead of a ":"
    JAVASCRIPT = '.js',
    TYPESCRIPT = '.ts',
    RUST = '.rs',
    PYTHON = '.py',
}
```

## Using enums {#using-enums}

Using enums is straightforward. Simply use dot notation as you normally would with a regular object.

```ts
enum FileExtension {
    JAVASCRIPT = '.js',
    TYPESCRIPT = '.ts',
    RUST = '.rs',
    PYTHON = '.py',
}

const value = FileExtension.JAVASCRIPT;

console.log(value) // => ".js"
```

## Using enums as types {#using-enums-as-types}

The nice thing about enums is that they can be used directly in type annotations as somewhat of a custom type. Observe this function:

```ts
const createFileName = (name: string, extension: string) => {
    return name + extension;
};
```

We can restrict `extension` so that it can only be a value in the enum by replacing `extension: string` with `extension: FileExtension`:

```ts
enum FileExtension {
    JAVASCRIPT = '.js',
    TYPESCRIPT = '.ts',
    RUST = '.rs',
    PYTHON = '.py',
}

const createFileName = (name: string, extension: FileExtension) => {
    return name + extension;
};

// Call the function and use the enum to populate the second parameter
const fileName = createFileName('hello', FileExtension.TYPESCRIPT);

console.log(fileName);
```

We don't get autocomplete, but the `extension` parameter is now restricted to the values defined in the `FileExtension` enum.

## Next up {#next}

The `enum` keyword is just the tip of the iceberg of the exclusive features TypeScript has to offer. Let's now [learn about](./type_aliases.md) type aliases (custom types!) with the `type` keyword.
