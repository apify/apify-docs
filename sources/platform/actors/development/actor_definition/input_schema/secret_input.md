---
title: Secret input
description: Learn about making some Actor input fields secret and encrypted. Ideal for passing passwords, API tokens, or login cookies to Actors.
slug: /actors/development/actor-definition/input-schema/secret-input
---

**Learn about making some Actor input fields secret and encrypted. Ideal for passing passwords, API tokens, or login cookies to Actors.**

---

The secret input feature lets you mark specific input fields of an Actor as sensitive. When you save the Actor's input configuration, the values of these marked fields get encrypted. The encrypted input data can only be decrypted within the Actor. This provides an extra layer of security for sensitive information like API keys, passwords, or other confidential data.

## How to set a secret input field

To make an input field secret, you need to add a `"isSecret": true` setting to the input field in the Actor's [input schema](./index.md), like this:

<!-- eslint-skip -->
```json
{
    // ...
    "properties": {
        // ...
        "password": {
            "title": "Password",
            "type": "string",
            "description": "A secret, encrypted input field",
            "editor": "textfield",
            "isSecret": true
        },
        // ...
    },
    // ...
}
```

The editor for this input field will then turn into a secret input, and when you edit the field value, it will be stored encrypted.
<!-- vale off -->
<img src={require("./images/secret-input-editor.png").default} alt="Secret input editor" style={{ width: '100%', maxWidth: '822px' }}/>
<!-- vale on -->
:::note Type restriction

This is only available for `string` inputs, and the editor type is limited to `textfield` or `textarea`.

:::

## Read secret input fields

When you read the Actor input through `Actor.getInput()`, the encrypted fields are automatically decrypted (starting with the [`apify` package](https://www.npmjs.com/package/apify) version 3.1.0).

<!-- eslint-skip -->
```js
> await Actor.getInput();
{
    username: 'username',
    password: 'password'
}
```

If you read the `INPUT` key from the Actor run's default key-value store directly, you will still get the original, encrypted input value.

<!-- eslint-skip -->
```js
> await Actor.getValue('INPUT');
{
    username: 'username',
    password: 'ENCRYPTED_VALUE:Hw/uqRMRNHmxXYYDJCyaQX6xcwUnVYQnH4fWIlKZL2Vhtq1rZmtoGXQSnhIXmF58+DjKlMZpTlK2zN3YUXk1ylzU6LfXyysOG/PISAfwm27FUgy3IfdgMyQggQ4MydLzdlzefX0mPRyixBviRcFhRTC+K7nK9lkATt3wJpj91YAZm104ZYkcd5KmsU2JX39vxN0A0lX53NjIenzs3wYPaPYLdjKIe+nqG9fHlL7kALyi7Htpy91ZgnQJ1s9saJRkKfWXvmLYIo5db69zU9dGCeJzUc0ca154O+KYYP7QTebJxqZNQsC8EH6sVMQU3W0qYKjuN8fUm1fRzyw/kKFacQ==:VfQd2ZbUt3S0RZ2ciywEWYVBbTTZOTiy'
}
```

## Encryption mechanism

The encryption mechanism used for encrypting the secret input fields is the same dual encryption as in [PGP](https://en.wikipedia.org/wiki/Pretty_Good_Privacy#/media/File:PGP_diagram.svg). The secret input field is encrypted using a random key, using the `aes-256-gcm` cipher, and then the key is encrypted using a 2048-bit RSA key.

The RSA key is unique for each combination of user and Actor, ensuring that no Actor can decrypt input intended for runs of another Actor by the same user, and no user can decrypt input runs of the same Actor by a different user. This isolation of decryption keys enhances the security of sensitive input data.

During Actor execution, the decryption keys are passed as environment variables, restricting the decryption of secret input fields to occur solely within the context of the Actor run. This approach prevents unauthorized access to sensitive input data outside the Actor's execution environment.


## Example Actor

If you want to test the secret input live, check out the [Example Secret Input](https://console.apify.com/actors/O3S2UlSKzkcnFHRRA) Actor in Apify Console.
If you want to dig in deeper, you can check out its [source code](https://github.com/apify/actor-example-secret-input) on GitHub.
