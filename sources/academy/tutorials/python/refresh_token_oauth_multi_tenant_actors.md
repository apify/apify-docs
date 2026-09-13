---
title: How to set up refresh token OAuth for a multi-tenant Apify Actor
description: Learn how to authenticate users in a multi-tenant Apify Actor calling per-user Google APIs without hosting an OAuth callback URL or storing user identity.
sidebar_position: 3
slug: /python/refresh-token-oauth-multi-tenant-actors
---

**Learn how to authenticate users in a multi-tenant Apify Actor that calls per-user Google APIs, without hosting an OAuth callback URL or storing user identity on the Apify side.**

---

If you are shipping an Apify Actor that calls a per-user Google API such as Gmail, Calendar, or Drive, and the Actor will be used by people you do not know, the simplest authentication model that works is refresh token OAuth.

The pattern is:

1. The Actor user generates a refresh token on their own machine.
1. The user pastes `refresh_token`, `client_id`, and `client_secret` into the Actor input.
1. The Actor exchanges them for a short-lived access token at runtime, calls the API, and exits.

There is no mailbox cache, no per-user OAuth callback URL hosted on Apify, and no Apify-side identity storage. The trust boundary is clean: the user holds their own credentials, the Actor is stateless, and both the Apify-hosted and self-hosted modes work from the same code.

## Step 1: Google Cloud setup

1. Open [Google Cloud Console](https://console.cloud.google.com), create a new project or pick an existing one.
1. Go to **APIs and Services** -> **Library** and enable the API you need, for example the Gmail API.
1. Go to **APIs and Services** -> **OAuth consent screen**, choose **External**, fill in the app name and your email, and add only the scopes you actually need, for example `gmail.readonly`. If you stay below 100 users, leave the app in **Testing** mode and add test users manually. Google verification is not required at that scale.
1. Go to **APIs and Services** -> **Credentials**, click **Create credentials** -> **OAuth client ID**, choose **Desktop app** as the application type, and download the JSON. The JSON contains `client_id` and `client_secret`.

The **Desktop app** client type is the unlock. It does not require you to host an OAuth redirect URL. The Google client library spins up `localhost:8080` during the consent flow and captures the authorization code automatically.

## Step 2: Generate the refresh token

The Actor user runs this script once on their own machine. You do not host it, they do.

```python
# scripts/oauth_setup.py
from google_auth_oauthlib.flow import InstalledAppFlow

SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"]

flow = InstalledAppFlow.from_client_secrets_file("credentials.json", SCOPES)
creds = flow.run_local_server(
    port=8080,
    access_type="offline",
    prompt="consent",
)
print("refresh_token:", creds.refresh_token)
```

The combination `access_type="offline"` plus `prompt="consent"` is what guarantees Google returns a refresh token. Without `prompt="consent"`, if the user has authorized the client before, Google will return only an access token. With it, the consent screen appears again and a fresh refresh token is minted.

The output is a long string starting with `1//`. That string is the `refresh_token`. The user pastes it into the Actor input alongside `client_id` and `client_secret`.

## Step 3: Exchange for an access token at runtime

In the Actor's main handler, before calling the Google API:

```python
import requests

def get_access_token(client_id, client_secret, refresh_token):
    resp = requests.post(
        "https://oauth2.googleapis.com/token",
        data={
            "client_id": client_id,
            "client_secret": client_secret,
            "refresh_token": refresh_token,
            "grant_type": "refresh_token",
        },
        timeout=10,
    )
    resp.raise_for_status()
    return resp.json()["access_token"]
```

The returned access token is valid for about one hour. For an Actor that runs in seconds to minutes, one exchange per run is enough. No caching is needed.

## Step 4: Define the Actor input schema

Add the credential fields to your `INPUT_SCHEMA.json`:

```json
{
  "title": "Gmail Actor input",
  "type": "object",
  "schemaVersion": 1,
  "required": ["client_id", "client_secret", "refresh_token"],
  "properties": {
    "client_id": {
      "type": "string",
      "title": "Google client_id",
      "editor": "textfield"
    },
    "client_secret": {
      "type": "string",
      "title": "Google client_secret",
      "editor": "textfield",
      "isSecret": true
    },
    "refresh_token": {
      "type": "string",
      "title": "Google refresh_token",
      "editor": "textfield",
      "isSecret": true
    }
  }
}
```

The `isSecret: true` flag tells the Apify Console UI to mask the field at rest in the Actor run record. Apify auto-encrypts secret input fields with platform-level keys. See the [input schema reference](/platform/actors/development/actor-definition/input-schema) for the full list of supported field options.

## Step 5 (recommended): Add a dry-run mode

The largest setup hurdle for a cold first-time user is the Google Cloud Console plus OAuth client plus consent screen detour in step 1. Users land on the Actor, click **Try for free**, hit the OAuth wall, and leave.

A fix that costs almost nothing is an optional `dry_run` boolean. When it is true, the Actor skips the OAuth exchange entirely and emits a synthetic dataset matching the real schema:

```python
async def main():
    async with Actor:
        inp = await Actor.get_input() or {}
        if inp.get("dry_run"):
            await Actor.push_data(SYNTHETIC_SAMPLE)
            return
        # ...normal flow with OAuth...
```

The first interaction becomes "click **Run** with the public example input and see what the output looks like". No Google Cloud Console required. The user commits to the OAuth setup only after seeing the JSON shape and deciding the Actor is worth it.

## Why this pattern, and not the alternatives

Three other approaches exist for multi-tenant Google API access:

- **Apify Integrations OAuth**. Tying the Actor to Apify's identity store would lock self-hosted users out of the same source code. The refresh token approach keeps both modes on one codebase.
- **Service account with domain-wide delegation**. This works for a single Google Workspace tenant, not for multi-tenant strangers from across many domains.
- **A custom OAuth callback URL hosted somewhere**. Extra infrastructure, extra cost, extra failure surface. The Desktop app client type removes the need.

Refresh token OAuth shifts the trust boundary cleanly: the user holds their own credentials, the Actor is stateless, and the same code runs both on Apify and self-hosted.

## Security notes

- The `client_secret` is not a true secret in the OAuth Desktop app model. Google's threat model assumes it can be extracted from the binary. The actual security is enforced by the consent screen and the user holding their refresh token.
- The refresh token is sensitive. Treat it like a password. Setting `"isSecret": true` on the input field encrypts it at rest in the run record and masks it in the Apify Console UI.
- Scope your OAuth consent screen to the minimum scope the Actor needs, for example `gmail.readonly` and not `gmail.modify`. Users review scopes during consent and a smaller scope reduces friction.
- The access token returned in step 3 is short-lived (about one hour) and should never be persisted past the Actor run.

## Related reading

- [Actor input schema reference](/platform/actors/development/actor-definition/input-schema)
- [Secret input fields](/platform/actors/development/actor-definition/input-schema/secret-input)
- [Google OAuth 2.0 for Desktop apps](https://developers.google.com/identity/protocols/oauth2/native-app)
