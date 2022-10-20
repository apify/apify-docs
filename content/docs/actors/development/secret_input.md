---
title: Secret input
description: Learn about making some input fields secret and encrypted.
paths:
# NOTE: IF ADDING A NEW PATH, LEAVE THE OLD ONES FOR REDIRECTS
    - actor/secret-input
    - actors/secret-input
    - actor/development/secret-input
    - actors/development/secret-input
---

# [](#secret-input)Secret input

The Secret Input feature allows you to make an input field secret, causing it to be stored encrypted when setting the actor input, and decrypted only inside the actor.

## Setting an input field as secret

To make an input field secret, just set `"isSecret": true` to the field in the actor's [input schema]({{@link actors/development/input_schema.md}}), like this:

```jsonc
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
<img src="{{@asset actors/development/images/secret-input-editor.webp}}" alt="Secret input editor" style="width: 100%; max-width: 822px;"/>

This is only available for `string` inputs, and the editor type is limited to `textfield` or `textarea`.

## Reading secret input fields

When you read the actor input through `Actor.getInput()`, the encrypted fields are automatically decrypted, without any additional code needed (starting with the [`apify` package](https://www.npmjs.com/package/apify) version 3.1.0).

```js
> await Actor.getInput();
{
    username: 'username',
    password: 'password'
}
```

If you read the `INPUT` key from the actor run's default key-value store directly, you will still get the original, encrypted input value.

```js
> await Actor.getValue('INPUT');
{
    username: 'username',
    password: 'ENCRYPTED_VALUE:Hw/uqRMRNHmxXYYDJCyaQX6xcwUnVYQnH4fWIlKZL2Vhtq1rZmtoGXQSnhIXmF58+DjKlMZpTlK2zN3YUXk1ylzU6LfXyysOG/PISAfwm27FUgy3IfdgMyQggQ4MydLzdlzefX0mPRyixBviRcFhRTC+K7nK9lkATt3wJpj91YAZm104ZYkcd5KmsU2JX39vxN0A0lX53NjIenzs3wYPaPYLdjKIe+nqG9fHlL7kALyi7Htpy91ZgnQJ1s9saJRkKfWXvmLYIo5db69zU9dGCeJzUc0ca154O+KYYP7QTebJxqZNQsC8EH6sVMQU3W0qYKjuN8fUm1fRzyw/kKFacQ==:VfQd2ZbUt3S0RZ2ciywEWYVBbTTZOTiy'
}
```

## Encryption mechanism

The encryption mechanism used for encrypting the secret input fields is the same dual encryption as in [PGP](https://en.wikipedia.org/wiki/Pretty_Good_Privacy#/media/File:PGP_diagram.svg).

The secret input field is encrypted using a random key, using the `aes-256-gcm` cipher, and then the key is encrypted using a 2048-bit RSA key.
The RSA key is unique for every user and actor combination, so no actor can decrypt input meant for other actor run of the same user, and no user can decrypt input of actor runs of a different user, but same actor.

The decryption keys are passed to the actor runs as environment variables, so the input decryption happens only inside of the actor run.

## Example actor

If you want to test the secret input live, check out the [Example Secret Input](https://console.apify.com/actors/O3S2UlSKzkcnFHRRA) actor in the Apify Console.
If you want to dig in deeper, you can check out its [source code](https://github.com/apify/actor-example-secret-input) on GitHub.
