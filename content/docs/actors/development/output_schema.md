---
title: Output schema
description: Output schema is designed to help Actor Creators present the results in an output UI attractive to Actor Users. 
paths:
# NOTE: IF ADDING A NEW PATH, LEAVE THE OLD ONES FOR REDIRECTS
    - actors/development/output-schema
---

# Actor Output schema

It is recommended to present the most important fields in curated Overview visualisation configured using Output Schema specification, while all available fields are automatically available in “All fields” view.

In the future Output schema will also help with strict output data format validation which will make integrations more solid and easier to setup.

## Specification version 1

An actor's output schema defines the structure and both API and visual representation of data produced by an Actor. Output configuration files have to be located in `.actor` folder in the actor's root directory.

### There are 2 options on how to organise files in .actor folder

A) all config options are being set in .actor/actor.json file
eg.:

```JSON
//file: .actor/actor.json
{
    "actorSpecification": 1,
    "name": "this-is-book-library-scraper",
    "title": "Book Library scraper",
    "version": "1.0.0",
    "storages": {
        "dataset": {
            "actorSpecification": 1,
            "fields": {},
            "views": {
                "overview": {
                    "title": "Overview",
                    "transformation": {},
                    "display": {}
                }
            }
        }
    }
}
```

B) .actor/actor.json links to other sub-config files in the same folder
eg.:

```JSON
//file: .actor/actor.json
{
    "actorSpecification": 1,
    "name": "this-is-book-library-scraper",
    "title": "Book Library scraper",
    "version": "1.0.0",
    "storages": {
        "dataset": "./dataset_schema.json"
    }
}
```

```JSON
//file: .actor/dataset_schema.json
{
    "actorSpecification": 1,
    "fields": {},
    "views": {
        "overview": {
            "title": "Overview",
            "transformation": {},
            "display": {}
        }
    }
}
```

Both options are equivalent. The user can choose based on their own needs.

## Basic Template

Let’s say we are going to use a single file to setup an Actor’s Output tab UI. The following template can be used as an `.actor/actor.json` configuration.

```JSON
//file: .actor/actor.json
{
    "actorSpecification": 1,
    "name": "___ENTER_ACTOR_NAME____",
    "title": "___ENTER_ACTOR_TITLE____",
    "version": "1.0.0",
    "storages": {
        "dataset": {
            "actorSpecification": 1,
            "views": {
                "overview": {
                    "title": "Overview",
                    "transformation": {
                        "fields": [
                            "___EXAMPLE_NUMERIC_FIELD___",
                            "___EXAMPLE_PICTURE_URL_FIELD___",
                            "___EXAMPLE_LINK_URL_FIELD___",
                            "___EXAMPLE_TEXT_FIELD___",
                            "___EXAMPLE_BOOLEAN_FIELD___"
                        ]
                    },
                    "display": {
                        "component": "table",
                        "properties": {
                            "___EXAMPLE_NUMERIC_FIELD___": {
                                "label": "ID",
                                "format": "number"
                            },
                            "___EXAMPLE_PICTURE_URL_FIELD___": {
                                "format": "image",
                            },
                            "___EXAMPLE_LINK_URL_FIELD___": {
                                "label": "Clickable link",
                                "format": "link"
                            }
                        }
                    }
                }
            }
        }
    }
}
```

The template above defines the configuration for the default dataset output view. Under the **views** property there is one view with the title **Overview**. The view configuration consists of 2 basic steps 1) setup how to fetch the data aka **transformation** and 2) setup how to **display** the data which was fetched in step 1). The default behaviour is that the Output tab UI table will display **all the fields** from `transformation.fields` **in that same order**. So theoretically there should be no need to setup `[**display.properties**](http://display.properties)` at all. However, it can be customised in case it is visually worth setting up some specific display format or column labels. The customisation is made by using one of the `transformation.fields` name inside of `display.properties` and overriding either label or format as it is demonstrated in the basic template above.

A 2-step configuration (transform & display) was implemented to provide a way how to fetch the  data in the format that is presented in both API and UI consistently. Consistency between API data and UI data is crucial for actor end-users in order to experience the same results in both API and UI. Thus for the best end-user experience we recommend overriding as less display properties as possible.

## Example with inline comments

```JSON
//file: .actor/actor.json
{
    "actorSpecification": 1,                //mandatory
    "name": "this-is-book-library-scraper", //mandatory, unique name of an actor
    "title": "Book Library scraper",        //mandatory, the human readable name of an actor
    "version": "1.0.0",                     //mandatory
    "storages": {                           //mandatory
        "dataset": {                        //mandatory
            "actorSpecification": 1,        //mandatory
            "fields": {},                   //mandatory, but it can be an empty object for now
            "views": {                      //mandatory
                "overview": {               //mandatory, but it does not have to be "overview", one can choose any name, multiple views are possible within views object
                    "title": "Overview",    //mandatory, one can choose any other title
                    "transformation": {     //mandatory
                        "fields": [         //mandatory, fields property supports basic JSONPath selectors
                            "isbn",         //important, an order of fields in this array matches the order of columns in visualisation UI
                            "picture",
                            "title",
                            "buyOnlineUrl",
                            "author",
                            "longBookDescription",
                            "anObjectWithDeepStructure.pageCount",
                            "anObjectWithDeepStructure.buyOnlineUrl",
                            "anObjectWithDeepStructure.isRead",
                            "anObjectWithDeepStructure.lastReadTime",
                            "anArray",
                            "anObject"
                        ],
                        "flatten": [        //optional, flattened objects are easily available for as display.properties keys
                            "anObjectWithDeepStructure"
                        ]
                    },
                    "display": {                      //mandatory
                        "component": "table",         //mandatory
                        "properties": {               //mandatory
                            "isbn": {                 //optional, use transformation.fields values there as keys
                                "label": "ISBN",      //optional, define "label" only in case you would like to overide the basic field name capitalisation in table UI
                                // "format": "text"   //optional, "text" format is default, use only in case you would like to overide the default format settings
                            },
                            "picture": {
                                "label": "Cover",
                                "format": "image"     //optional, in this case the format is overriden to show "image" instead of image link "text". "image" format only works with .jpeg, .png or other image format urls.
                            },
                            // "title": {             //does not have to be specified, default behaviour will show the field correctly
                            //    "label": "Title",
                            //    "format": "text"
                            // },
                            "buyOnlineUrl": {
                                "label": "URL",
                                "format": "link"
                            },
                            // "author": {
                            //     "label": "Author",
                            //     "format": "text"
                            // },
                            "longBookDescription": {
                                "label": "Description"
                            },
                            "anObjectWithDeepStructure.pageCount": {   //use "." for sub-keys of flattened objects
                                "label": "# pages",
                                "format": "number"
                            },
                            "anObjectWithDeepStructure.isRead": {
                                "label": "Have been read?",
                                "format": "boolean"
                            },
                            "anObjectWithDeepStructure.lastReadTime": {
                                "label": "Last read time",
                                "format": "date"
                            },
                            "anObjectExample": {
                                "label": "Some Object"
                            },
                            "anArrayExample": {
                                "label": "Some Array"
                            }
                        }
                    }
                }
            }
        }
    }
}
```

### Nested structures

Most frequently used data formats are presenting the data in tabular format (Output tab Table, Excel, CSV). In case an actor produces nested JSON structures there is a need to transform nested data into flat tabular format. There are 3 options how to flatten the data:

1) use `transformation.flatten` to flatten the nested structure of specified fields. Flatten transforms the nested object into flat structure. eg: with `flatten:[”foo”]` the object `{”foo”:{”bar”:”hello”}}` is turned into `{’foo.bar”:”hello”}`. Once the structure is flattened it is necessary to use the flattened property name in both `transformation.fields` and [`display.properties`](http://display.properties) otherwise fields might not be fetched or configured properly in the UI visualisation.
2) use `transformation.unwind` to deconstructs the nested children into parent object.
3) changing the output structure in an Actor from nested to flat before results are saved in dataset

## Dataset schema structure definitions

### DatasetSchema object definition

| Property           | Type                         | Required | Description                                                                                        |
| ------------------ | ---------------------------- | -------- | -------------------------------------------------------------------------------------------------- |
| actorSpecification | integer                      | true     | Specifies the version of dataset schema <br/>structure document. <br/>Currently only version 1 is available. |
| fields             | JSONSchema compatible object | true     | Schema of one dataset object. <br/>Use JsonSchema Draft 2020-12 or <br/>other compatible format.             |
| views              | DatasetView object           | true     | An object with description of an API <br/>and UI views                                                  |

### DatasetView object definition

| Property       | Type                      | Required | Description                                                                                           |
| -------------- | ------------------------- | -------- | ----------------------------------------------------------------------------------------------------- |
| title          | string                    | true     | The title is visible in UI in Output tab <br/>as well as in the API.                                       |
| description    | string                    | false    | Description is only available in API response. <br/>Usage of this field is optional.                       |
| transformation | ViewTransformation object | true     | The definition of data transformation which <br/>is applied when dataset data are loaded from <br/>Dataset API. |
| display        | ViewDisplay object        | true     | The definition of Output tab UI visualisation.                                                        |

### ViewTransformation object definition

| Property | Type     | Required | Description                                                                                                                                                                                                         |
| -------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| fields   | string[] | true     | Selects fields that is going to be presented on Output. <br/>An order of fields matches the order of columns <br/>in visualisation UI. In case the fields value <br/>is missing it will be presented as “undefined” in the UI. |
| unwind   | string   | false    | Deconstructs nested children into parent object. <br/>eg: with unwind:[”foo”] the object `{”foo”:{”bar”:”hello”}}` <br/>is turned into `{’bar”:”hello”}`                                                                      |
| flatten  | string[] | false    | Transforms nested object into flat structure. <br/>eg: with flatten:[”foo”] the object `{”foo”:{”bar”:”hello”}}` <br/>is turned into `{’foo.bar”:”hello”}`                                                                    |
| omit     | string   | false    | Removes specified fields from the output. <br/>Nested fields names can used there as well.                                                                                                                           |
| limit    | integer  | false    | Maximum number of results returned. <br/>Default is all results.                                                                                                                                                         |
| desc     | boolean  | false    | By default results are sorted Ascending based <br/>on the write event into dataset. desc:true param <br/>will return the newest writes to dataset first.                                                                      |

### ViewDisplay object definition

| Property   | Type                                                                                                               | Required | Description                                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------- |
| component  | string                                                                                                             | true     | Only component “table” is available.                                                                                         |
| properties |  Object | false    | Object with keys matching the `transformation.fields` <br/>and ViewDisplayProperty as values. In case properties are not set <br/>the table will be rendered automatically with fields formatted as Strings, <br/>Arrays or Objects. |

### ViewDisplayProperty object definition

| Property | Type                                                    | Required | Description                                                                                    |
| -------- | ------------------------------------------------------- | -------- | ---------------------------------------------------------------------------------------------- |
| label    | string                                                  | false    | In case the data are visualised as in Table view. <br/>Label will be visible table column’s header. |
| format   | enum(text, number, date, <br/>boolean, image, array, object) | false    | Describes how Output data values are formatted <br/>in order to be rendered in Output tab UI.       |
