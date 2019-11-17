---
title: Actions
description: Documentation of Apify webhooks system that enables integration of multiple actors or external systems.
menuWeight: 8.2
---

# [](./webhooks#actions)Actions

Currently, the only available action is to send an HTTP POST request to a URL specified in the webhook. New actions will come later.

## [](./webhooks#actions-http-request)HTTP request

This action sends an HTTP POST request to the provided URL with a JSON payload. The payload is defined using a payload template, a JSON-like syntax that extends JSON with the use of variables enclosed in doubly curly braces `{{variable}}`. This enables the payload to be dynamically injected with data at the time when the webhook is triggered.

The response to the POST request must have an HTTP status code in the `2XX` range. Otherwise it is considered an error and the request is periodically retried with an exponential back-off: first retry happens after roughly 1 minute, second after 2 minutes, third after 4 minutes etc. After 11 such retries which take around 32 hours, the system gives up and stops retrying the requests.

For safety reasons, the webhook URL should contain a secret token to ensure only Apify can invoke it. To test your endpoint, you can use the _Test_ button in the user interface. The timeout of the webhook HTTP request is 30 seconds. If your endpoint performs a time-consuming operation, you should respond to the request immediately so that it does not time out before Apify receives the response. To ensure that the time-consuming operation is reliably finished, you can internally use a message queue to retry the operation on internal failure. In rare circumstances, the webhook might be invoked more than once, you should design your code to be idempotent to duplicate calls.

### [](./webhooks#actions-http-request-payload-template)Payload template

The payload template is a JSON-like string, whose syntax is extended with the use of variables. This is useful when a custom payload structure is needed, but at the same time dynamic data, that is only known at the time of the webhook's invocation, need to be injected into the payload. Aside from the variables, the string must be a valid JSON.

The variables need to be enclosed in double curly braces and cannot be chosen arbitrarily. A pre-defined list, [that can be found below]({{@link webhooks/actions.md#actions-http-request-available-variables}}), shows all the currently available variables. Using any other variable than one of the pre-defined will result in a validation error.

The syntax of a variable therefore is: `{{oneOfAvailableVariables}}`.

#### Default payload template:

    {
        "userId": {{userId}},
        "createdAt": {{createdAt}},
        "eventType": {{eventType}},
        "eventData": {{eventData}},
        "resource": {{resource}}
    }

#### Default payload example:

    {
        "userId": "abf6vtB2nvQZ4nJzo",
        "createdAt": "2019-01-09T15:59:56.408Z",
        "eventType": "ACTOR.RUN.SUCCEEDED",
        "eventData": {
            "actorId": "fW4MyDhgwtMLrB987",
            "actorRunId": "uPBN9qaKd2iLs5naZ"
        },
        "resource": {
            "id": "uPBN9qaKd2iLs5naZ",
            "actId": "fW4MyDhgwtMLrB987",
            "userId": "abf6vtB2nvQZ4nJzo",
            "startedAt": "2019-01-09T15:59:40.750Z",
            "finishedAt": "2019-01-09T15:59:56.408Z",
            "status": "SUCCEEDED",
            ...
        }
    }

You may have noticed that the `eventData` and `resource` properties contain redundant data. This is for backwards compatibility. Feel free to only use `eventData` or `resource` in your templates, depending on your use case.

### []({{@link webhooks/actions.md#actions-http-request-available-variables}})Available variables

|Variable|Type|Description|
|--- |--- |--- |
|`userId`|string|ID of the user who owns the webhook.|
|`createdAt`|string|ISO string date of the webhook's trigger event.|
|`eventType`|string|Type of the trigger event, [see Events]({{@link webhooks/events.md}}).|
|`eventData`|Object|Data associated with the trigger event, [see Events]({{@link webhooks/events.md}}).|
|`resource`|Object|The resource that caused the trigger event, [see below]({{@link webhooks/actions.md#actions-http-request-available-variables-resource}}).|


#### Resource

The `resource`variable represents the triggering system resource. For example when using the `ACTOR.RUN.SUCCEEDED` event, the resource is the actor run. The variable will be replaced by an `Object` that one would receive as response from the relevant API at the moment when the webhook is triggered. So for the actor run resource, it would be the response of the [`GET` actor run](https://apify.com/docs/api/v2#/reference/actors/run-object/get-run) API endpoint.
