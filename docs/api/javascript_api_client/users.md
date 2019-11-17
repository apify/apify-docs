---
title: ApifyClient.users
description: Documentation of ApifyClient.users
menuWeight: 8
---

## ApifyClient.users

Users

### Methods (1)

#### getUser(options, callback opt) → {UserInfo}

Returns private and public information about user account.

##### Parameters:

*   **`options`** ( Object )

    *   **`token`** ( String ) <optional> - If set, the function returns a private and public information for the user account, otherwise it only returns public information.
    *   **`userId`** ( String ) <optional> - Desired user ID or username. By default it is `'me'`, which causes the function to return information about the current user. Defaults to `'me'`.

*   **`callback`** ( function ) <optional> - Callback function

##### Returns:

*   ( UserInfo )
