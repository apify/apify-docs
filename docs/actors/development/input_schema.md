---
title: Input schema
description: Documentation of Apify actors - defining your actor's input schema.
paths:
# NOTE: IF ADDING A NEW PATH, LEAVE THE OLD ONES FOR REDIRECTS
    - actor/input-schema
    - actor/development/input-schema
    - actors/input-schema
    - actors/development/input-schema
---

# [](#actor-input-schema)Actor input schema

## [](#specification-version-1)Specification version 1

Actor input schema defines the input that the actor accepts and the UI components used for input at the Apify platform. Using input schema, you can provide UI to actor users that is easy to use, and also ensure that the input of your actor is valid.

Input schema must be stored in a file named `INPUT_SCHEMA.json` in the root directory of the actor. Maximum size of the input schema file is 100 kB. If the input schema is provided, then input is always validated to fulfill the schema when an actor is being started (via API or from a run console at the Apify platform).

You can also use our [visual input schema editor](https://apify.github.io/input-schema-editor-react) to guide you through creation of the `INPUT_SCHEMA.json` file.

## [](#example)Example

Imagine you are building a simple crawler whose inputs are an array of start URLs and a Javascript function that will be executed at each page the crawler visits. Then the input schema will look as follows:

    {
        "title": "Cheerio Crawler input",
        "description": "To update crawler to another site,
            you need to change startUrls and
            pageFunction options!",
        "type": "object",
        "schemaVersion": 1,
        "properties": {
            "startUrls": {
                "title": "Start URLs",
                "type": "array",
                "description": "URLs to start with",
                "prefill": [
                    { "url": "http://example.com" },
                    { "url": "http://example.com/some-path" }
                ],
                "editor": "requestListSources"
            },
            "pageFunction": {
                "title": "Page function",
                "type": "string",
                "description": "Function executed for each request",
                "prefill": "async () => {return $('title').text();}",
                "editor": "javascript"
            }
        },
        "required": ["startUrls", "pageFunction"]
    }

And generated the input UI will be:

![Apify actor input schema example]({{@asset actors/images/input-schema-example.png}})

If you switch the input to **raw** display using the blue toggle, then you will see the entered input stringified to a JSON format as it will be passed to the actor:

    {
      "startUrls": [
        {
          "url": "http://example.com"
        },
        {
          "url": "http://example.com/some-path"
        }
      ],
      "pageFunction": "async () => {return $('title').text();}"
    }

## [](#structure)Structure

The input schema is a JSON file named `INPUT_SCHEMA.json`, placed in the root directory of an actor with the following structure:

    {
        "title": "Cheerio Crawler input",
        "type": "object",
        "schemaVersion": 1,
        "properties": { /* define input fields here */ },
        "required": []
    }

|Property|Type|Required|Description|
|--- |--- |--- |--- |
|`title`|String|Yes|Any text describing your input schema.|
|`description`|String|No|Help text for the input that will be <br/>displayed above the UI fields.|
|`type`|String|Yes|This is fixed and must be set <br/>to string `object`.|
|`schemaVersion`|Integer|Yes|The version of the input schema <br/>specification against which <br/>your schema is written. <br/>Currently, only version `1` is out.|
|`properties`|Object|Yes|This is an object mapping each field key <br/>to its specification.|
|`required`|[String]|No|An array of field keys that are required.|

## [](#fields)Fields

Each field of your input is described under its key in `inputSchema.properties` object. The field might have `integer`, `string`, `array`, `object` or `boolean` type and its specification contains the following properties:

|Property|Value|Required|Description|
|--- |--- |--- |--- |
|`type`|One of <br/>`string`, <br/>`array`, <br/>`object`, <br/>`boolean`, <br/>`integer`|Yes|Allowed type for the input value. <br/>Cannot be mixed.|
|`title`|String|Yes|Title of the field in UI.|
|`description`|String|Yes|Description of the field that will be <br/>displayed as help text in Actor input UI.|
|`default`|Must match <br/>`type` property.|No|Default value that will be <br/>used when no value is provided.|
|`prefill`|Must match <br/>`type` property.|No|Value that will be prefilled <br/>in the actor input interface. <br/>Only the `boolean` type doesn't <br/>support `prefill` property.|
|`example`|Must match <br/>`type` property.|No|Sample value of this field <br/>for the actor to be displayed when <br/>actor is published in Apify Store.|
|`sectionCaption`|String|No|If this property is set, <br/>then all fields following this field <br/>(this field included) will be separated <br/>into a collapsible section <br/>with the value set as its caption. <br/>The section ends at the last field <br/>or the next field which has the <br/> `sectionCaption` property set.|
|`sectionDescription`|String|No|If the `sectionCaption` property is set, <br/>then you can use this property to <br/>provide additional description to the section. <br/>The description will be visible right under <br/>the caption when the section is open.|


### [](#additional-properties)Additional properties

In addition to the properties listed above, most of the types support also additional properties defining, for example, the UI input editor.

#### [](#string)String

Example of a code input:

    {
        "title": "Page function",
        "type": "string",
        "description": "Function executed for each request",
        "editor": "javascript",
        "prefill": "async () => {return $('title').text();}"
    }

Rendered input:

![Apify actor input schema page function]({{@asset actors/images/input-schema-page-function.png}})

Example of country selection using a select input:

    {
        "title": "Country",
        "type": "string",
        "description": "Select your country",
        "editor": "select",
        "default": "us",
        "enum": ["us", "de", "fr"],
        "enumTitles": ["USA", "Germany", "France"]
    }

Rendered input:

![Apify actor input schema - country input]({{@asset actors/images/input-schema-country.png}})

Properties:

|Property|Value|Required|Description|
|--- |--- |--- |--- |
|`editor`|One of `json`, <br/>`textfield`, <br/>`textarea`, <br/>`javascript`, <br/>`select`, <br/>`hidden`|Yes|Visual editor used for <br/>the input field.|
|`pattern`|String|No|Regular expression that will be <br/>used to validate the input.|
|`minLength`|Integer|No|Minimum length of the string.|
|`maxLength`|Integer|No|Maximum length of the string.|
|`enum`|[String]|Required if <br/>`editor` <br/>is `select`|Using this field, you can limit values <br/>to the given array of strings. <br/>Input will be displayed as select box.|
|`enumTitles`|[String]|No|Titles for the `enum` keys described.|
|`nullable`|Boolean|No|Specifies whether `null` <br/>is an allowed value.|


#### [](#boolean)Boolean

Beware that the `boolean` input type doesn't support the `prefill` property, since there is no way to display the prefilled value in the user interface.

Example options with group caption:

    {
        "verboseLog": {
            "title": "Verbose log",
            "type": "boolean",
            "description": "Debug messages will be included
                in the log.",
            "default": true,
            "groupCaption": "Options",
            "groupDescription": "Various options for this actor"
        },
        "lightspeed": {
            "title": "Lightspeed",
            "type": "boolean",
            "description": "If checked then actors runs at the
                speed of light.",
            "default": true
        }
    }

Rendered input:

![Apify actor input schema options]({{@asset actors/images/input-schema-options.png}})

Properties:

|Property|Value|Required|Description|
|--- |--- |--- |--- |
|`editor`|One of <br/>`checkbox`, <br/>`hidden`|No|Visual editor used for the input field.|
|`groupCaption`|String|No|If you want to group <br/>multiple checkboxes together, <br/>add this option to the first <br/>of the group.|
|`groupDescription`|String|No|Description displayed as help text <br/>displayed of group title.|
|`nullable`|Boolean|No|Specifies whether null is <br/>an allowed value.|

#### [](#integer)Integer

Example:

    {
        "title": "Memory",
        "type": "integer",
        "description": "Select memory in megabytes",
        "default": 64,
        "maximum": 1024,
        "unit": "MB"
    }

Rendered input:

![Apify actor input schema memory]({{@asset actors/images/input-schema-memory.png}})

Properties:

|Property|Value|Required|Description|
|--- |--- |--- |--- |
|`editor`|One of <br/>`number`, <br/>`hidden`|No|Visual editor used for input field.|
|`maximum`|Integer|No|Maximum allowed value.|
|`minimum`|Integer|No|Minimum allowed value.|
|`unit`|String|No|Unit displayed next to the field in UI, <br/>for example _second_, _MB_, etc.|
|`nullable`|Boolean|No|Specifies whether null is an allowed value.|

#### [](#object)Object

Example of proxy configuration:

    {
        "title": "Proxy configuration",
        "type": "object",
        "description": "Select proxies to be used by your crawler.",
        "prefill": { "useApifyProxy": true },
        "editor": "proxy"
    }

Rendered input:

![Apify actor input schema proxy]({{@asset actors/images/input-schema-proxy.png}})

The object where the proxy configuration is stored has the following structure:

    {
        // Indicates whether Apify Proxy was selected.
        "useApifyProxy": Boolean,

        // Array of Apify Proxy groups. Is missing or null if
        // Apify Proxy's automatic mode was selected
        // or if proxies are not used.
        "apifyProxyGroups": String[],

        // Array of custom proxy URLs. 
        // Is missing or null if custom proxies were not used.
        "proxyUrls": String[],
    }

Example of a blackbox object:

    {
        "title": "User object",
        "type": "object",
        "description": "Enter object representing user",
        "prefill": {
            "name": "John Doe",
            "email": "janedoe@gmail.com"
        },
        "editor": "json"
    }

Rendered input:

![Apify actor input schema user object]({{@asset actors/images/input-schema-user.png}})

Properties:

|Property|Value|Required|Description|
|--- |--- |--- |--- |
|`editor`|One of <br/>`json`, <br/>`proxy`, <br/>`hidden`|Yes|UI editor used for input.|
|`patternKey`|String|No|Regular expression that will be used <br/>to validate the keys of the object.|
|`patternValue`|String|No|Regular expression that will be used <br/>to validate the values of object.|
|`maxProperties`|Integer|No|Maximum number of properties <br/>the object can have.|
|`minProperties`|Integer|No|Minimum number of properties <br/>the object can have.|
|`nullable`|Boolean|No|Specifies whether null is <br/>an allowed value.|


### [](#array)Array

Example of request list sources configuration:

    {
        "title": "Start URLs",
        "type": "array",
        "description": "URLs to start with",
        "prefill": [{ "url": "http://example.com" }],
        "editor": "requestListSources"
    }

Rendered input:

![Apify actor input schema start urls array]({{@asset actors/images/input-schema-start-urls.png}})

Example of an array:

    {
        "title": "Colors",
        "type": "array",
        "description": "Enter colors you know",
        "prefill": ["Red", "White"],
        "editor": "json"
    }

Rendered input:

![Apify actor input schema colors array]({{@asset actors/images/input-schema-colors.png}})

Properties:

|Property|Value|Required|Description|
|--- |--- |--- |--- |
|`editor`|One of <br/>`json`, <br/>`requestListSources`, <br/>`pseudoUrls`, <br/>`keyValue`, <br/>`stringList`, <br/>`hidden`|Yes|UI editor used for input.|
|`placeholderKey`|String|No|Placeholder displayed for <br/>key field when no value is specified. <br/>Works only with `keyValue` editor.|
|`placeholderValue`|String|No|Placeholder displayed in value field <br/>when no value is provided. <br/>Works only with `keyValue` and <br/>`stringList` editors.|
|`patternKey`|String|No|Regular expression that <br/>will be used to validate <br/>the keys of items in the array. <br/>Works only with `keyValue` <br/>editor.|
|`patternValue`|String|No|Regular expression that <br/>will be used to validate the values <br/>of items in the array. <br/>Works only with `keyValue` and <br/>`stringList` editors.|
|`maxItems`|Integer|No|Maximum number of items <br/>the array can contain.|
|`minItems`|Integer|No|Minimum number of items <br/>the array can contain.|
|`uniqueItems`|Boolean|No|Specifies whether the array <br/>should contain only unique values.|
|`nullable`|Boolean|No|Specifies whether null is <br/>an allowed value.|


Usage of this field is based on the selected editor:

*   `requestListSources` - value from this field can be used as input of [RequestList](https://sdk.apify.com/docs/api/request-list) class from Apify SDK.
*   `pseudoUrls` - is intended to be used with a combination of the [PseudoUrl](https://sdk.apify.com/docs/api/pseudo-url) class and the [Apify.utils.enqueueLinks()](https://sdk.apify.com/docs/api/utils#utilsenqueuelinksoptions) function from the Apify SDK.

Editor type `requestListSources` supports input in formats defined by the [sources](https://sdk.apify.com/docs/typedefs/request-list-options#sources) property of [RequestListOptions](https://sdk.apify.com/docs/typedefs/request-list-options).
