---
title: Installation & getting started
description: Install TypeScript and the TS compiler on your machine, then write your very first lines of TypeScript code by fixing a logical bug in a vanilla JS snippet.
menuWeight: 7.1
paths:
    - switching-to-typescript/installation
---

# [](#installation-getting-started) Installation & getting started

> In order to install and use TypeScript, you'll first need to make sure you've installed [Node.js](https://nodejs.org). Node.js comes with a package manager called [NPM](https://npmjs.com), through which TypeScript can be installed.

To install TypeScript globally on your machine, run the following command in your terminal:

```shell
npm install -g typescript
```

> On MacOS or Linux, you might need to prefix this command with `sudo`.

That's it!

## [](#understanding-what-typescript-solves) Understanding the problems TypeScript solves

To aid in properly showing some of the benefits TypeScript brings, here is some vanilla JavaScript code that has a bug. This bug will not throw an error or cause the program to crash, but it is a logical error that does not output what we expect.

```JavaScript
const products = [
    {
        title: 'iPhone',
        price: '1000',
    },
    {
        title: 'iPad',
        price: '1099',
    },
];

const addPrices = (price1, price2) => {
    return price1 + price2;
};

console.log(addPrices(products[0].price, products[1].price));
```

The output of this code is **10001099**, because instead of adding two numbers together, we've concatenated two strings together using the `+` operator. Surely, this is not what we wanted to do.

No problem, right? We can just add a type check within the `addPrices` function so that it can support both strings and numbers:

```JavaScript
const products = [
    {
        title: 'iPhone',
        price: '1000',
    },
    {
        title: 'iPad',
        price: '1099',
    },
];

const addPrices = (price1, price2) => {
    // If they are numbers just add them together
    if (typeof price1 === 'number' && typeof price2 === 'number') {
        return price1 + price2;
    }

    // Otherwise, convert them to numbers and add them together
    return +price1 + +price2;
};

console.log(addPrices(products[0].price, products[1].price));
```

Now, the output of our code is **2099**, exactly what we wanted. However, this extra logic hasn't really solved our issue. We only ever want numbers to be passed into `addPrices`, and nothing else. This is where TS comes in handy.

## [](#writing-your-first-typescript-code) Writing your first TypeScript code

> We recommend using [VSCode](https://code.visualstudio.com/) to write your TypeScript code, but feel free to use any IDE that supports TypeScript when following along with this course.

Let's create a folder called **learning-typescript**, adding a new file within it named **first-lines.ts**. Then, we'll go ahead and paste the very first code example from this lesson into that file. Once again, the example is written in vanilla JavaScript, but since all JavaScript code is valid TypeScript code, this will be pretty much seamless.

![Example pasted into first-lines.ts]({{@asset switching_to_typescript/images/pasted-example.webp}})

As seen above, TypeScript has successfully recognized our code; however, there are now red underlines under the `price1` and `price2` parameters in the function declaration of `addPrices`. This is because right now, the compiler has no idea what data types we're expecting to be passed in. This can be solved with the simple addition of **type annotations** to the parameters by using a colon (`:`) and the name of the parameter's type.

```TypeScript
const products = [
    {
        title: 'iPhone',
        price: '1000',
    },
    {
        title: 'iPad',
        price: '1099',
    },
];

// Add type annotations so that now the function will
// only accept numbers.
const addPrices = (price1: number, price2: number) => {
    return price1 + price2;
};

console.log(addPrices(products[0].price, products[1].price));
```

Since the function now only accepts numbers, the parameters in the function call within the `console.log` at the bottom of the file are now underlined in red.

![Example pasted into first-lines.ts]({{@asset switching_to_typescript/images/another-error.webp}})

This is because TypeScript has automatically inferred (without us even needing to do anything) that `products` is an array of objects containing `title` and `price` properties - both strings. Because of this type inference, it knows that `products[0].price` and `products[1].price` are both strings, and does not allow them to be passed into `addPrices`, which only accepts numbers. We'll solve this by converting the values to numbers when passing them into the function.

```TypeScript
const products = [
    {
        title: 'iPhone',
        price: '1000',
    },
    {
        title: 'iPad',
        price: '1099',
    },
];

const addPrices = (price1: number, price2: number) => {
    return price1 + price2;
};

// Convert the values to numbers as they are passed in
console.log(addPrices(+products[0].price, +products[1].price));
```

Now, our code will work exactly as it should, and we can feel certain that no similar mistakes will be made when using the `addPrices` function again.

## [](#compiling) Compiling

In order to run the code we wrote in the above section, we'll have to compile the **first-lines.ts** file into vanilla JavasScript.

Using the TypeScript compiler is extremely straightforward. Just run the `tsc` command in your terminal with the path to the file to compile, and the compiler will do its magic!

```shell
tsc first-lines.ts
```

A **first-lines.js** file appears after running this command, which can be run like normal with this command:

```shell
node first-lines.js
```

Outputted is `2099`, exactly what we expected. Awesome!

## [](#next) Next up

In the [next lesson], we'll be discussing how to use some of the core types that TypeScript offers.
