---
title: Interfaces
description: Understand how to declare object types with the "interface" keyword, and the subtle difference interfaces have with regular type aliases.
sidebar_position: 7.8
slug: /switching-to-typescript/interfaces
---

# Interfaces {#interfaces}

**Understand how to declare object types with the "interface" keyword, and the subtle difference interfaces have with regular type aliases.**

---

In the [**Using types - II**](./using_types_continued.md) lesson, you learned about object types and how to create them. Let's create a new custom object type using the `type` keyword that we're already familiar with.

```ts
type Person = {
    name: string;
    age: number;
    hobbies: string[];
};
```

We can keep this just as it is, which would be totally okay, or we could use an [interface](https://www.typescriptlang.org/docs/handbook/typescript-tooling-in-5-minutes.html#interfaces). Interfaces and type aliases are nearly identical in their functionality; however there are two main differences:

1. Interfaces can **ONLY** hold function or object types.
2. Types can only be declared once, while interfaces of the same name can be declared multiple times and will automatically merge.
3. The syntax between the two differs slightly.

> When working with object types, it usually just comes down to preference whether you decide to use an interface or a type alias.

Using the `interface` keyword, we can easily turn our `Person` type into an interface.

```ts
// Interfaces don't need an "=" sign
interface Person {
    name: string;
    age: number;
    hobbies: string[];
};
```

When creating a new interface, you can also use the `extends` keyword to inherit all of the object properties from another interface (or type alias):

```ts
interface Person {
    name: string;
    age: number;
    hobbies: string[];
}

// This would also work just fine if "Person"
// was declared with the "type" keyword instead
interface Employee extends Person {
    occupation: string;
}
```

This is functionality is not unique to interfaces though, as it can be done with something called an [intersection type](https://www.typescriptlang.org/docs/handbook/2/objects.html#intersection-types) when using the `type` keyword.

```ts
type Employee = Person & {
    occupation: string;
};
```

Overall, the differences between interfaces and type aliases are quite subtle. In some use cases, one might be better than the other, but in general it's up to you which you want to use.

> To learn more about the differences between `interface` and `type`, check out [this article](https://medium.com/@martin_hotell/interface-vs-type-alias-in-typescript-2-7-2a8f1777af4c).

## Next up {#next}

It's finally time to [build our project](./mini_project.md)! The project we'll be building in the next lesson will be a small API scraper utilizes many of the TypeScript features learned in the course.
