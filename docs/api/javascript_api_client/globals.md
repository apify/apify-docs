---
title: Globals
description: Documentation of globals
menuWeight: 11
---

## Globals

### Type Definitions

#### QueueHead

##### Properties:

*   **`limit`** ( Number) - Maximum number of items to be returned.
*   **`queueModifiedAt`** ( Date) - Date of the last modification of the queue.
*   **`items`** ( Array) - Array of objects containing `id`, `url`, `method`, `uniqueKey` and `retryCount` attributes.

#### RequestOperationInfo

##### Properties:

*   **`wasAlreadyPresent`** ( Boolean) - Indicates if request was already present in the queue.
*   **`wasAlreadyHandled`** ( Boolean) - Indicates if request was already marked as handled.
*   **`requestId`** ( String) - The ID of the added request
