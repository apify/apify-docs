---
title: Implementation details
description: Learn how to integrate with other Actors and tasks
sidebar_position: 3
slug: /integrations/actors/implementation-details
---


Under the hood the Actor to Actor integration uses regular HTTP POST webhooks targeting Apify API, it’s just nicer UI for the same thing. The UI allows to fill the payload template using Actor input UI, not just plaintext, and constructs the url to start actor with given options.

The UI makes sure that the variables are enclosed in strings, meaning that event the payload template itself is a valid JSON, not just the resulting interpolation. It also automatically adds `payload` field that contains default webhook payload. So for Actors that are meant to be used as integrations, users don’t have to fill in the variables, and Actor just takes the data from this field.
