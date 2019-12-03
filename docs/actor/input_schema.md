---
title: Input schema
description: Documentation of Apify Actor input schema.
menuWeight: 3.5
---

# [](#actor-input-schema)Actor input schema

#### Specification version 1

Actor input schema defines the input that actor accepts and the UI components used for input at Apify platform. Using input schema you can provide UI to actor users that is easy to use and also ensure that input of your actor is valid.

Input schema must be stored in a file named `INPUT_SCHEMA.json` in the root directory of the actor. Maximum size of input schema file is 100 kB. If the input schema is provided then input is always validated to fulfill schema when an actor is being started (via API or from run console at Apify platform).

## Example

Imagine you are building a simple crawler whose inputs are an array of start URLs and javascript function that will be executed at each page crawler visits. Then the input schema will look as follows:

    {
        "title": "Cheerio Crawler input",
        "description": "To update crawler to another site you need to change startUrls and pageFunction options!",
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
                "prefill": "async () => {\n  return $('title').text();\n\n}",
                "editor": "javascript"
            }
        },
        "required": ["startUrls", "pageFunction"]
    }

And generated input UI will be:

![Apify actor input schema example]({{@asset actor/images/input-schema-example.png}})

If you switch input to **raw** display using a blue switcher then you will see entered input stringified to a JSON format as it will be passed to the actor:

    {
      "startUrls": [
        {
          "url": "http://example.com"
        },
        {
          "url": "http://example.com/some-path"
        }
      ],
      "pageFunction": "async () => {\n  return $('title').text();\n\n}"
    }

## Structure

Input schema is a JSON file named `INPUT_SCHEMA.json` in the root directory of an actor with the following structure:

    {
        "title": "Cheerio Crawler input",
        "type": "object",
        "schemaVersion": 1,
        "properties": { /* here is a place for definition of input fields */ },
        "required": []
    }

|Property|Type|Required|Description|
|--- |--- |--- |--- |
|`title`|String|Yes|Any text describing your input schema.|
|`description`|String|No|Help text for input that will be displayed above the UI fields.|
|`type`|String|Yes|This is fixed and must be set to string `object`|
|`schemaVersion`|Integer|Yes|The version of input schema specification against your schema is written. Currently, only version `1` is out.|
|`properties`|Object|Yes|This is an object mapping each field key to its specification.|
|`required`|[String]|No|An array of field keys that are required.|

## Fields

Each field of your input is described under its key in `inputSchema.properties` object. The field might have `integer`, `string`, `array`, `object` or `boolean` type and its specification contains the following properties:

|Property|Value|Required|Description|
|--- |--- |--- |--- |
|`type`|One of `string`, `array`, `object`, `boolean`, `integer`|Yes|Allowed type for the input value. Cannot be mixed.|
|`title`|String|Yes|Title of the field in UI.|
|`description`|String|Yes|Description of the field that will be displayed as help text in Actor input UI.|
|`default`|Must match `type` property.|No|Default value that will be used when no value is provided.|
|`prefill`|Must match `type` property.|No|Value that will be prefilled in the actor input interface. Only the `boolean` type doesn't support `prefill` property.|
|`example`|Must match `type` property.|No|Sample value of this field for the actor to be displayed when actor is published in Apify Store.|
|`sectionCaption`|String|No|If this property is set then all fields following this field (this field included) will be separated into a collapsible section with the value set as it's caption. The section ends at the last field or next field which has `sectionCaption` property set.|
|`sectionDescription`|String|No|If `sectionCaption` property is set, then you can use this property to provide additional description to the section. The description will be visible right under the caption when the section is open.|


### Additional properties

In addition to that properties listed above, most of the types support also additional properties defining, for example, UI input editor.

#### String

Example of code input:

    {
        "title": "Page function",
        "type": "string",
        "description": "Function executed for each request",
        "editor": "javascript",
        "prefill": "async () => {\n  return $('title').text();\n\n}"
    }

Rendered input:

![Apify actor input schema page function]({{@asset actor/images/input-schema-page-function.png}})

Example of country selection using select input:

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

![Apify actor input schema - country input]({{@asset actor/images/input-schema-country.png}})

Properties:

|Property|Value|Required|Description|
|--- |--- |--- |--- |
|`editor`|One of `json`, `textfield`, `textarea`, `javascript`, `select`, `hidden`|Yes|Visual editor used for input field.|
|`pattern`|String|No|Regular expression that will be used to validate the input|
|`minLength`|Integer|No|Minimum length of the string|
|`maxLength`|Integer|No|Maximum length of the string|
|`enum`|[String]|Required if editor is `select`|Using this field you can limit values to the given array se of strings. Input will be displayed as select box.|
|`enumTitles`|[String]|No|Titles for the `enum` keys described|
|`nullable`|Boolean|No|Specifies whether null is an allowed value|


#### Boolean

Beware that the `boolean` input type doesn't support the `prefill` property, since there is no way to display the prefilled value in the user interface.

Example options with group caption:

    {
        "verboseLog": {
            "title": "Verbose log",
            "type": "boolean",
            "description": "Debug messages will be included in the log.",
            "default": true,
            "groupCaption": "Options",
            "groupDescription": "Various options for this actor"
        },
        "lightspeed": {
            "title": "Lightspeed",
            "type": "boolean",
            "description": "If checked then actors runs at a speed of light.",
            "default": true
        }
    }

Rendered input:

![Apify actor input schema options]({{@asset actor/images/input-schema-options.png}})

Properties:

|Property|Value|Required|Description|
|--- |--- |--- |--- |
|`editor`|One of `checkbox`, `hidden`|no|Visual editor used for input field.|
|`groupCaption`|String|No|If you want to group multiple checkboxes together add this option to the first one.|
|`groupDescription`|String|No|Description displayed as help text displayed of group title.|
|`nullable`|Boolean|No|Specifies whether null is an allowed value|

#### Integer

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

![Apify actor input schema memory]({{@asset actor/images/input-schema-memory.png}})

Properties:

|Property|Value|Required|Description|
|--- |--- |--- |--- |
|`editor`|One of `number`, `hidden`|no|Visual editor used for input field.|
|`maximum`|Integer|No|Maximum allowed value.|
|`minimum`|Integer|No|Minimum allowed value|
|`unit`|String>|No|Unit displayed next to the field in UI. For example second, MB, etc.|
|`nullable`|Boolean|No|Specifies whether null is an allowed value|

#### Object

Example of proxy configuration:

    {
        "title": "Proxy configuration",
        "type": "object",
        "description": "Select proxies to be used by your crawler.",
        "prefill": { "useApifyProxy": true },
        "editor": "proxy"
    }

Rendered input:

![Apify actor input schema proxy]({{@asset actor/images/input-schema-proxy.png}})

The object where proxy configuration is stored has the following structure:

    {
        // Indicates whether Apify Proxy was selected.
        "useApifyProxy": Boolean,

        // Array of Apify Proxy groups. Is missing or null if Apify Proxy's
        // automatic mode was selected or proxies are not used.
        "apifyProxyGroups": String[],

        // Array of custom proxy URLs. Is missing or null if custom proxies were not used.
        "proxyUrls": String[],
    }

Example of an blackbox object:

    {
        "title": "User object",
        "type": "object",
        "description": "Enter object representing user",
        "prefill": { "name": "John Doe", "email": "johndoe@gmail.com" },
        "editor": "json"
    }

Rendered input:

![Apify actor input schema user object]({{@asset actor/images/input-schema-user.png}})

Properties:

|Property|Value|Required|Description|
|--- |--- |--- |--- |
|`editor`|One of `json`, `proxy`, `hidden`|Yes|UI editor used for input.|
|`patternKey`|String|No|Regular expression that will be used to validate the keys of the object|
|`patternValue`|String|No|Regular expression that will be used to validate the values of object|
|`maxProperties`|Integer|No|Maximum number of properties the object can have|
|`minProperties`|Integer|No|Minimum number of properties the object can have|
|`nullable`|Boolean|No|Specifies whether null is an allowed value|


### Array

Example of request list sources configuration:

    {
        "title": "Start URLs",
        "type": "array",
        "description": "URLs to start with",
        "prefill": [{ "url": "http://example.com" }],
        "editor": "requestListSources"
    }

Rendered input:

![Apify actor input schema start urls array]({{@asset actor/images/input-schema-start-urls.png}})

Example of an array:

    {
        "title": "Colors",
        "type": "array",
        "description": "Enter colors you know",
        "prefill": ["Red", "White"],
        "editor": "json"
    }

Rendered input:

![Apify actor input schema colors array]({{@asset actor/images/input-schema-colors.png}})

Properties:

|Property|Value|Required|Description|
|--- |--- |--- |--- |
|`editor`|One of `json`, `requestListSources`, `pseudoUrls`, `keyValue`, `stringList`, `hidden`|Yes|UI editor used for input.|
|`placeholderKey`|String|No|Placeholder displayed for key field when no value is specified. Works only with `keyValue` editor.|
|`placeholderValue`|String|No|Placeholder displayed in value field when no value is provided. Works only with `keyValue` and `stringList` editors.|
|`patternKey`|String|No|Regular expression that will be used to validate the keys of items in the array. Works only with `keyValue` editor.|
|`patternValue`|String|No|Regular expression that will be used to validate the values of items in the array. Works only with `keyValue` and `stringList` editors.|
|`maxItems`|Integer|No|Maximum number of items the array can contain.|
|`minItems`|Integer|No|Minimum number of items the array can contain.|
|`uniqueItems`|Boolean|No|Specifies whether the array should contain only unique values|
|`nullable`|Boolean|No|Specifies whether null is an allowed value|


Usage of this field is based on the selected editor:

*   `requestListSources` - value from this field can be used as input of [RequestList](https://sdk.apify.com/docs/api/requestlist) class from Apify SDK.
*   `pseudoUrls` - is intended to be used with combination of [PseudoUrl](https://sdk.apify.com/docs/api/pseudourl) class and [Apify.utils.puppeteer.enqueueLinks()](https://sdk.apify.com/docs/api/puppeteer#puppeteer.enqueueLinks) function from Apify SDK.
