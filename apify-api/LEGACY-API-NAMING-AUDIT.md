# Legacy API naming audit

Audit of `apify-api/openapi/` to identify legacy naming that should be cleaned up in a future breaking API version (e.g., `v3`). Each finding lists the legacy form, the modern form already in use, affected files, and the recommended fix.

## 1. URL path prefix: `/v2/acts/` should be `/v2/actors/`

All Actor-scoped endpoints use the legacy `acts/` prefix while parallel resource paths already use the modern name (`/v2/actor-runs/`, `/v2/actor-builds/`, `/v2/actor-tasks/`).

**Legacy paths in `openapi.yaml` (lines 483-556):**

- `/v2/acts`
- `/v2/acts/{actorId}`
- `/v2/acts/{actorId}/versions`
- `/v2/acts/{actorId}/versions/{versionNumber}`
- `/v2/acts/{actorId}/versions/{versionNumber}/env-vars`
- `/v2/acts/{actorId}/versions/{versionNumber}/env-vars/{envVarName}`
- `/v2/acts/{actorId}/webhooks`
- `/v2/acts/{actorId}/builds`
- `/v2/acts/{actorId}/builds/default`
- `/v2/acts/{actorId}/builds/{buildId}`
- `/v2/acts/{actorId}/builds/{buildId}/openapi.json`
- `/v2/acts/{actorId}/builds/{buildId}/abort`
- `/v2/acts/{actorId}/runs`
- `/v2/acts/{actorId}/run-sync`
- `/v2/acts/{actorId}/run-sync-get-dataset-items`
- `/v2/acts/{actorId}/validate-input`
- `/v2/acts/{actorId}/runs/last` and `/v2/acts/{actorId}/runs/last/*` (dataset, key-value-store, request-queue, log subtrees)
- `/v2/acts/{actorId}/runs/{runId}`
- `/v2/acts/{actorId}/runs/{runId}/abort`
- `/v2/acts/{actorId}/runs/{runId}/metamorph`
- `/v2/acts/{actorId}/runs/{runId}/resurrect`

**Modern equivalents already exist** for the standalone run/build resources: `/v2/actor-runs/{runId}`, `/v2/actor-builds/{buildId}`.

**Fix:** Rename the path prefix from `acts` to `actors`. The whole `paths/actors/acts@*` file tree (and the `components/objects/actors/acts@*` referenced from `Update version` PUT/POST) should be renamed to `actors@*`. Approximately 40 files.

## 2. Response payload field: `actId` should be `actorId`

The response payload uses `actId` (legacy `act` terminology) while modern siblings such as `actorTaskId`, `actorRunId`, `buildId`, `userId` consistently use the full noun. This affects every Run, Build, Task, Dataset, Key-value store, and Request queue object.

**Schema files containing `actId`:**

| File | Lines |
| --- | --- |
| `components/schemas/actor-runs/Run.yaml` | required (5), property (23) |
| `components/schemas/actor-runs/RunShort.yaml` | required (4), property (18) |
| `components/schemas/actor-builds/Build.yaml` | required (4), property (15), example (73) |
| `components/schemas/actor-builds/BuildShort.yaml` | property (12) |
| `components/schemas/actor-tasks/Task.yaml` | required (5), property (17) |
| `components/schemas/actor-tasks/TaskShort.yaml` | required (5), property (17) |
| `components/schemas/actor-tasks/CreateTaskRequest.yaml` | required (3), property (6) - **request body** |
| `components/schemas/actor-tasks/TaskResponse.yaml` | example (13) |
| `components/schemas/datasets/Dataset.yaml` | property (42) |
| `components/schemas/datasets/DatasetListItem.yaml` | property (40) |
| `components/schemas/key-value-stores/KeyValueStore.yaml` | property (33) |
| `components/schemas/request-queues/RequestQueueShort.yaml` | property (46) |
| `components/examples/AbortedRunExample.yaml` | example (3) |
| `components/examples/ListOfRunsResponseExample.yaml` | examples (10, 24) |
| `paths/actors/acts@{actorId}@builds@{buildId}@abort.yaml` | example (28) |
| `paths/actor-tasks/actor-tasks.yaml` | examples (41, 52, 107, 116) |
| `code_samples/javascript/actorTasks_post.js` | sample (9) |

`actId` should become `actorId` everywhere. The modern name is already used in:

- `webhook-dispatches/WebhookDispatch.yaml#/eventData/actorId`
- `webhooks/WebhookCondition.yaml#/actorId`
- `actor-runs/Metamorph.yaml#/actorId`
- `schedules/Schedule*RunActor.yaml#/actorId`

so the data already inconsistent on the wire.

## 3. Response payload field: `actRunId` should be `actorRunId`

Companion to `actId`. The storage objects (which can be associated with the Actor run that created them) expose a legacy `actRunId` while webhook payloads already use the modern `actorRunId`.

**Files:**

- `components/schemas/datasets/Dataset.yaml:44`
- `components/schemas/datasets/DatasetListItem.yaml:43`
- `components/schemas/key-value-stores/KeyValueStore.yaml:36`
- `components/schemas/request-queues/RequestQueueShort.yaml:49`

Modern name already used in `webhook-dispatches/WebhookDispatch.yaml#/eventData/actorRunId` and `webhooks/WebhookCondition.yaml#/actorRunId`.

## 4. Response payload fields: `actName` / `actUsername` should be `actorName` / `actorUsername`

Only `TaskShort` exposes these denormalized fields, but they share the same legacy `act*` prefix.

**Files:**

- `components/schemas/actor-tasks/TaskShort.yaml:20` (`actName`) and `:29` (`actUsername`)
- `paths/actor-tasks/actor-tasks.yaml:42, 45, 53, 54` (response examples)

## 5. `operationId` prefix: `act_*` / `acts_*` should be `actor_*` / `actors_*`

Operation IDs (used to generate client method names, links, and code samples) split into two camps. Newer endpoints use `actorRun_*`, `actorBuild_*`, `actorTask_*`. Older Actor endpoints still use `act_*` / `acts_*`. Affects ~26 operationIds.

**Examples:**

- `acts.yaml`: `acts_get`, `acts_post` → `actors_get`, `actors_post`
- `acts@{actorId}.yaml`: `act_get`, `act_put`, `act_delete` → `actor_get`, `actor_put`, `actor_delete`
- `acts@{actorId}@runs.yaml`: `act_runs_get`, `act_runs_post` → `actor_runs_get`, `actor_runs_post`
- `acts@{actorId}@runs@{runId}.yaml`: `act_run_get`
- `acts@{actorId}@runs@{runId}@abort.yaml`: `act_run_abort_post`
- `acts@{actorId}@runs@{runId}@metamorph.yaml`: `act_run_metamorph_post`
- `acts@{actorId}@runs@{runId}@resurrect.yaml`: `act_run_resurrect_post`
- `acts@{actorId}@runs@last.yaml`: `act_runs_last_get`
- `acts@{actorId}@run-sync.yaml`: `act_runSync_get`, `act_runSync_post`
- `acts@{actorId}@run-sync-get-dataset-items.yaml`: `act_runSyncGetDatasetItems_get`/`_post`
- `acts@{actorId}@validate-input.yaml`: `act_validateInput_post`
- `acts@{actorId}@webhooks.yaml`: `act_webhooks_get`
- `acts@{actorId}@versions.yaml`: `act_versions_get`, `act_versions_post`
- `acts@{actorId}@versions@{versionNumber}.yaml`: `act_version_get`, `act_version_put`, `act_version_post`, `act_version_delete`
- `acts@{actorId}@versions@{versionNumber}@env-vars.yaml`: `act_version_envVars_get`/`_post`
- `acts@{actorId}@versions@{versionNumber}@env-vars@{envVarName}.yaml`: `act_version_envVar_get`/`_put`/`_post`/`_delete`
- `acts@{actorId}@builds.yaml`: `act_builds_get`/`_post`
- `acts@{actorId}@builds@default.yaml`: `act_build_default_get`
- `acts@{actorId}@builds@{buildId}.yaml`: `act_build_get`
- `acts@{actorId}@builds@{buildId}@abort.yaml`: `act_build_abort_post`
- `acts@{actorId}@builds@{buildId}@openapi.json.yaml`: `act_openapi_json_get`
- `components/objects/datasets/dataset.yaml` shared fragments: `act_runs_last_dataset_get`/`_put`/`_delete`

Plus two outliers that use `PascalCase` instead of the dominant `camelCase`:

- `actor-runs@{runId}@resurrect.yaml`: `PostResurrectRun` → `actorRun_resurrect_post`
- `actor-runs@{runId}@charge.yaml`: `PostChargeRun` → `actorRun_charge_post`

## 6. Operation aliasing: POST endpoints that duplicate PUT

These endpoints exist solely as POST aliases of the canonical PUT operation, presumably for clients that cannot issue PUT. They are legacy and should be dropped in v3.

**Files:**

- `components/objects/actors/acts@{actorId}@versions@{versionNumber}put.yaml` - `act_version_post` aliases `act_version_put`
- `components/objects/actors/acts@{actorId}@versions@{versionNumber}@env-vars@{envVarName}put.yaml` - `act_version_envVar_post` aliases `act_version_envVar_put`
- `components/objects/key-value-stores/key-value-store-records.yaml` - `keyValueStore_record_post` aliases `keyValueStore_record_put`
- `components/objects/key-value-stores/key-value-store-record.yaml` - second `keyValueStore_record_post` aliases `keyValueStore_record_put`

Additionally, the API supports `?method=POST` as a hidden HTTP-method override (`openapi.yaml:32`). This should also go in v3.

## 7. Parameter naming: storage path params are inconsistent

Each storage resource uses a short parameter name that doesn't include the resource type, while Actor-related paths use the full `actorId` / `actorTaskId`.

| Resource | Current param | Suggested param |
| --- | --- | --- |
| Key-value store | `storeId` | `keyValueStoreId` |
| Request queue | `queueId` | `requestQueueId` |
| Dataset | `datasetId` | (already correct) |
| Webhook dispatch | `dispatchId` | `webhookDispatchId` |

**Files:**

- `components/parameters/keyValueStoreParameters.yaml:8` (`storeId`)
- `components/parameters/requestQueueParameters.yaml:2` (`queueId`)
- `openapi.yaml:707` (`dispatchId`)

## 8. Endpoint placement: `/v2/browser-info` is at the top level

Other tooling endpoints live under `/v2/tools/` (`/v2/tools/encode-and-sign`, `/v2/tools/decode-and-verify`), but the browser info endpoint sits at the root.

**Fix:** Move to `/v2/tools/browser-info` for consistency. Defined in `openapi.yaml:727` referencing `paths/tools/tools@browser-info.yaml`.

## 9. Combined parameter: `buildOrRunId`

The `/v2/logs/{buildOrRunId}` endpoint accepts either a build ID or a run ID through a single combined path parameter, which is a legacy ergonomic shortcut.

**File:** `components/parameters/logParameters.yaml:25` and `openapi.yaml:717`.

**Recommendation:** Split into two endpoints (`/v2/logs/builds/{buildId}` and `/v2/logs/runs/{runId}`) or rely on the per-resource log endpoints (`/v2/actor-builds/{buildId}/log`, `/v2/actor-runs/{runId}/log`) that already exist.

## 10. Error type enum still uses "rented" / "rental" terminology

Apify's pricing terminology has moved to `FLAT_PRICE_PER_MONTH` (see `actor-pricing-info/FlatPricePerMonthActorPricingInfo.yaml`), but the error enum still uses the older "rental" wording.

**File:** `components/schemas/common/ErrorType.yaml`

- `actor-already-rented`
- `actor-can-not-be-rented`
- `actor-is-not-rented`
- `cannot-reimburse-non-rental-charge`
- `cannot-rent-paid-actor`
- `rental-charge-already-reimbursed`
- `rental-not-allowed`

**Fix:** Rename to `actor-already-subscribed` / `actor-subscription-required` / etc. (or whatever matches current product naming).

## 11. Tilde-separated ID convention

Multiple resources accept either an ID or a `username~resource-name` string. The convention is documented but the string syntax (`~`) is unusual for HTTP path parameters and creates ambiguity with URL encoding.

**Files:**

- `components/parameters/keyValueStoreParameters.yaml` (`username~store-name`)
- `components/parameters/requestQueueParameters.yaml` (`username~queue-name`)
- `components/parameters/datasetParameters.yaml` (`username~dataset-name`)
- `components/parameters/runAndBuildParameters.yaml` (Actor / Actor task)
- `openapi.yaml:465-475` (Referring to resources section)

**Optional v3 consideration:** Either drop the tilde syntax entirely (require canonical IDs), or replace it with a more standard `username/resource-name` style on a different endpoint.

## 12. Docs site links still point at legacy paths

Several documentation pages link to the legacy `/v2/acts-get` page slug or hardcode `/v2/acts/` URLs. While these are documentation rather than the API spec, they will need updating alongside an `actors` rename.

**Files:**

- `sources/platform/integrations/integrate_with_apify.md:77, 136`
- `sources/platform/integrations/workflows-and-notifications/bubble.md:252`
- `sources/platform/integrations/programming/webhooks/ad_hoc_webhooks.md:18`
- `sources/platform/integrations/actors/integrating_actors_via_api.md:28`
- `sources/platform/integrations/ai/skyfire.md:166`
- `sources/platform/integrations/ai/x402.md:96, 109`
- `sources/platform/actors/development/permissions/migration_guide.md:42`
- `sources/platform/actors/development/deployment/continuous_integration.md:41, 81`
- `sources/platform/actors/running/index.md:65`
- `sources/api/getting-started.mdx:68, 82`
- `sources/academy/platform/expert_scraping_with_apify/solutions/integrating_webhooks.md:186, 192`
- `sources/academy/platform/getting_started/apify_api.md:25, 47, 63`
- `sources/academy/tutorials/node_js/apify_free_google_serp_api.md:15`
- `sources/platform/integrations/programming/webhooks/actions.md:100` (uses `"actId":` in an example payload)

## 13. Schedule action: `runInput` / `runOptions` vs `input`

`ScheduleActionRunActor` and `ScheduleActionRunActorTask` serve symmetric purposes but spell the payload differently. The Actor variant uses `runInput` + `runOptions`; the Task variant uses just `input` (no options at all).

**Files:**

- `components/schemas/schedules/ScheduleActionRunActor.yaml` (`runInput`, `runOptions`)
- `components/schemas/schedules/ScheduleActionRunActorTask.yaml` (`input`)
- `components/schemas/schedules/ScheduleCreateActionRunActor.yaml` / `ScheduleCreateActionRunActorTask.yaml` (same split)
- `components/schemas/schedules/ScheduleActionShortRunActor.yaml` / `ScheduleActionShortRunActorTask.yaml` (same split)

**Fix:** Pick one name (`input` is the obvious choice — it's what Tasks already use and matches the input object on a Run). Add `runOptions` to the Task variant for parity, or drop it from the Actor variant.

## 14. `WebhookEventType` enum: `TEST` breaks the `ACTOR.<KIND>.<STATE>` pattern

Every other event uses dotted three-segment naming (`ACTOR.RUN.SUCCEEDED`, `ACTOR.BUILD.ABORTED`). `TEST` is a bare top-level value used by the "Test webhook" endpoint.

**File:** `components/schemas/webhooks/WebhookEventType.yaml:15`

**Fix:** Either move it out of the user-facing enum entirely (it's only emitted by `/webhooks/{webhookId}/test`, so it doesn't need to be a subscribable event), or rename to `WEBHOOK.TEST.TRIGGERED` for consistency.

## 15. `WebhookDispatch.eventData` is missing `actorTaskId`

`WebhookCondition` (the subscription side) supports `actorId`, `actorTaskId`, and `actorRunId`. The dispatched payload (`WebhookDispatch.eventData`) only declares `actorId` and `actorRunId` — task-triggered webhooks have no way to expose the task ID in the dispatch envelope.

**File:** `components/schemas/webhook-dispatches/WebhookDispatch.yaml:29-40`

**Fix:** Add optional `actorTaskId` to `eventData` so condition fields and event fields stay symmetric.

## 16. `RunOrigin` enum mixes user-facing and internal values

`DEVELOPMENT` and `TEST` look like internal/test-mode origins; the user-facing channels are `WEB`, `API`, `SCHEDULER`, `WEBHOOK`, `ACTOR`, `CLI`, `STANDBY`.

**File:** `components/schemas/actor-runs/RunOrigin.yaml`

**Fix:** Either document `DEVELOPMENT` / `TEST` as internal-only (and consider removing them from the public schema), or rename to a clearer `DEV_CONSOLE` / `INTERNAL_TEST` to indicate intent.

## 17. `ActorJobStatus` enum: `TIMING-OUT` / `TIMED-OUT` use hyphens

The other compound state names in the same enum are unhyphenated (`ABORTING`, `ABORTED`). Hyphens are unusual in enum identifiers and break code generators that map enums to symbol names.

**File:** `components/schemas/common/ActorJobStatus.yaml:8-9`

**Fix:** Rename to `TIMING_OUT` / `TIMED_OUT`. This is a breaking change because Webhook payloads and run responses ship these strings to clients.

## 18. `RunStats.metamorph` is a count, but the name is singular

`Run.metamorphs` is an array of metamorph events; `RunStats.metamorph` is an integer count of metamorphs. The other counter fields next to it follow the `<noun>Count` pattern (`migrationCount`, `rebootCount`, `restartCount`, `resurrectCount`).

**File:** `components/schemas/actor-runs/RunStats.yaml:64-67`

**Fix:** Rename to `metamorphCount`.

## 19. `RunStats.inputBodyLen` uses HTTP terminology for non-HTTP data

Input is not necessarily an HTTP request body; it's a JSON object (or binary) stored on the run. `inputBodyLen` reads like a header-style abbreviation.

**File:** `components/schemas/actor-runs/RunStats.yaml:8-11`

**Fix:** Rename to `inputBytes` or `inputSizeBytes`.

## 20. `ActorStandby.disableStandbyFieldsOverride` is a double negative

`disable…Override` requires two mental negations to evaluate (`true` = the override is disabled = overrides are not allowed).

**File:** `components/schemas/actors/ActorStandby.yaml:16`

**Fix:** Rename to `lockStandbyFields` (positive) or `allowFieldsOverride` (inverted boolean).

## 21. `Version.applyEnvVarsToBuild` is verb-phrased

Boolean fields normally describe state (`is*`, `has*`, plain adjective). `applyEnvVarsToBuild` reads like a command.

**Files:** `components/schemas/actors/Version.yaml:19-21`, `components/schemas/actors/CreateOrUpdateVersionRequest.yaml`

**Fix:** Rename to `envVarsIncludedInBuild` or `propagateEnvVarsToBuild`.

## 22. Units suffix: `Mbytes` / `Gbytes` are non-standard

Apify schemas use `Mbytes` (megabytes) and `Gbytes` (gigabytes) consistently across memory, disk, storage, transfer, and proxy traffic fields. Standard SI/IEC abbreviations are `MB` and `GB`; the current spelling reads as "Mbytes / Gbytes" and is uncommon in REST APIs.

**Affected fields (spot list, ~30 occurrences):**

- `users/Plan.yaml` — `maxActorMemoryGbytes`, `maxMonthlyResidentialProxyGbytes`, `maxMonthlyExternalDataTransferGbytes`
- `users/Limits.yaml` — same set plus `maxActorMemoryGbytes`
- `users/Current.yaml` — `actorMemoryGbytes`, `monthlyResidentialProxyGbytes`, `monthlyExternalDataTransferGbytes`
- `actors/DefaultRunOptions.yaml`, `actor-runs/RunOptions.yaml` — `memoryMbytes`
- `actor-builds/BuildOptions.yaml` — `memoryMbytes`, `diskMbytes`
- `actors/ActorDefinition.yaml` — `minMemoryMbytes`, `maxMemoryMbytes`
- `actors/ActorStandby.yaml`, `common/TaskOptions.yaml` — `memoryMbytes`

**Fix:** Rename `*Mbytes` → `*Mb` (or `*MB`) and `*Gbytes` → `*Gb` (or `*GB`) consistently. Affects ~25 schemas plus stored response examples.

## 23. User stats use `Job` instead of `Run` terminology

The user resource quotas talk about "Actor jobs" while the rest of the API consistently uses "Actor runs".

**Files:**

- `users/Current.yaml:11, 39` — `activeActorJobCount`
- `users/Limits.yaml` — `maxConcurrentActorJobs`

**Fix:** Rename to `activeActorRunCount` / `maxConcurrentActorRuns`. (`ActorJobStatus` is the only legitimate use of the "job" terminology because it covers both runs and builds.)

## 24. `StoreListActor.isWhiteListedForAgenticPayment` is misspelled

The compound word "whitelisted" is normally a single word in camelCase. The field uses `WhiteListed` (double capital). The accompanying description even spells it correctly ("whitelisted").

**Files:**

- `components/schemas/store/StoreListActor.yaml:56`
- `components/schemas/store/ListOfActorsInStoreResponse.yaml:36, 60` (response examples)

**Fix:** Rename to `isWhitelistedForAgenticPayment`.

## 25. Dataset query parameters explicitly emulate retired Apify Crawler product

Two dataset query parameters explicitly say in their own description that they're there to emulate the legacy Apify Crawler product and are not recommended for new integrations.

**File:** `components/parameters/datasetParameters.yaml`

- `simplified` (line 194) — emulates legacy Apify Crawler `pageFunctionResult` flattening
- `skipFailedPages` (line 230) — emulates legacy API v1 behavior
- `clean` (line 22) — shortcut for `skipHidden=true&skipEmpty=true`; redundant but not legacy in the same way

**Fix:** Drop `simplified` and `skipFailedPages` in v3. Consider keeping `clean` for ergonomics or dropping it as well.

## 26. Key-value store query parameter: two YAML keys map to one HTTP name `collection`

`collectionKeys` and `collectionRecords` are two distinct YAML anchors in `keyValueStoreParameters.yaml`, but both emit the HTTP query parameter `name: collection`. They differ only in description (one for the keys endpoint, one for the records endpoint).

**File:** `components/parameters/keyValueStoreParameters.yaml:42, 58`

**Fix:** Collapse into a single shared parameter (the descriptions can be reused via $ref). Not a wire change — only a spec-source cleanup.

## 27. `ActorDefinition.actorSpecification` is an integer version field stuck at `1`

`actorSpecification: integer const: 1` doesn't communicate intent. A field called `version` or `schemaVersion` would make the meaning self-explanatory.

**File:** `components/schemas/actors/ActorDefinition.yaml:5`

**Fix:** Rename to `schemaVersion` (matches dataset/KV store schema terminology) and consider bumping to `2` if v3 introduces breaking changes elsewhere in the actor definition.

## 28. Tags duplicated between nested and standalone variants

Because each Actor sub-resource has both an `/v2/acts/{actorId}/...` route and a standalone `/v2/actor-{runs,builds,tasks}/...` route, the tag list duplicates the same concept twice.

**File:** `components/tags.yaml`

- `Actors/Actor builds` AND `Actor builds`
- `Actors/Actor runs` AND `Actor runs`
- `Actors/Actor versions` (only nested)
- `Actors/Webhook collection` (only nested, name is also odd — should be `Actors/Actor webhooks`)
- `Last Actor run's default dataset` / `Last Actor run's default key-value store` / `Last Actor run's default request queue` / `Last Actor run's log` / `Last Actor task run's …` — five "last-run" navigation tags that only exist because of the `/runs/last/*` shortcut endpoints

**Fix:** Collapse to one tag per concept once `/v2/acts/` is gone. The `runs/last/*` endpoints could be retired entirely and replaced with documentation about how to call the canonical endpoints after fetching `runs/last`.

## 29. "curl" code samples are actually `apify` CLI commands

The samples directory at `code_samples/curl/` ships shell snippets like `apify actors start <ACTOR ID>` rather than `curl` invocations. They're labelled "cURL" in the rendered docs.

**Files:** every file in `apify-api/openapi/code_samples/curl/` (~31 files)

**Fix:** Either rename the directory and the label to `cli` (this matches the actual content), or provide real `curl` examples for v3. The current labelling misleads anyone copying the snippet expecting a portable HTTP request.

## 30. Decorator workaround for inconsistent operationIds

`apify-api/plugins/decorators/code-samples-decorator.mjs` contains a special case that remaps `PostResurrectRun` (PascalCase) to `actorRun_resurrect_post` (snake_case) so it can find the right code sample file. The decorator's existence is a symptom of the operationId inconsistency listed in §5.

**Fix:** Once §5 is resolved in v3, this workaround can be deleted.

## Summary

The most impactful breaking changes for v3, ranked by reach:

1. **`acts/` → `actors/`** in URL paths (~40 spec files, backwards-compat redirect needed).
2. **`actId` → `actorId`** in response/request payloads (15+ schemas, 100+ stored examples and client codepaths affected).
3. **`actRunId` → `actorRunId`** in storage list/detail payloads (4 schemas).
4. **`actName` / `actUsername` → `actorName` / `actorUsername`** in `TaskShort`.
5. **Normalize `operationId`s** away from `act_*` / `acts_*` prefix (26 IDs) and PascalCase outliers (`PostChargeRun`, `PostResurrectRun`).
6. **Drop POST aliases** of PUT operations (4 endpoints) and the `?method=` override.
7. **Tighten parameter names**: `storeId` → `keyValueStoreId`, `queueId` → `requestQueueId`, `dispatchId` → `webhookDispatchId`.
8. **Move `/v2/browser-info` → `/v2/tools/browser-info`**.
9. **Replace `buildOrRunId`** combined parameter with discrete endpoints.
10. **Replace "rented" terminology** in `ErrorType` enum.
11. **Decide tilde-separated ID syntax** future.
12. **Unify docs site links** that hardcode `acts/`.
13. **Schedule actions**: normalize `runInput`/`runOptions` vs `input`.
14. **Webhook event type `TEST`** breaks the `ACTOR.X.Y` pattern.
15. **WebhookDispatch.eventData** missing `actorTaskId`.
16. **RunOrigin enum** mixes internal (`DEVELOPMENT`, `TEST`) and external values.
17. **`ActorJobStatus`** enum: `TIMING-OUT` / `TIMED-OUT` should use underscores.
18. **`RunStats.metamorph`** → `metamorphCount`.
19. **`RunStats.inputBodyLen`** → `inputBytes`.
20. **`ActorStandby.disableStandbyFieldsOverride`** double-negative.
21. **`Version.applyEnvVarsToBuild`** verb-phrased boolean.
22. **`Mbytes` / `Gbytes`** unit suffix → `Mb` / `Gb` (or `MB` / `GB`).
23. **User stats**: `activeActorJobCount` / `maxConcurrentActorJobs` → `*ActorRunCount` / `maxConcurrentActorRuns`.
24. **`StoreListActor.isWhiteListedForAgenticPayment`** typo: should be `isWhitelisted…`.
25. **Drop `simplified` and `skipFailedPages`** dataset params (self-described as legacy Crawler emulation).
26. **Collapse `collectionKeys` / `collectionRecords`** duplicate YAML anchors.
27. **`ActorDefinition.actorSpecification`** → `schemaVersion`.
28. **Collapse duplicate tags** once `/v2/acts/` is gone (Actor builds, Actor runs, Last run's *, etc.).
29. **Rename `code_samples/curl/`** (or replace contents with real `curl` snippets).
30. **Retire `PostResurrectRun` decorator workaround** in `code-samples-decorator.mjs`.

Items 1–4 dominate the breaking surface — they show up in nearly every Actor/Run/Build/Task/storage response the API returns. Items 5–12 are spec-wide cleanups. Items 13–30 are targeted schema/enum/field-level adjustments that are individually small but add up to a measurably more consistent API.

The first four together represent the bulk of the breaking-change surface area, since they show up in every Actor / Run / Build / Task / storage response the API has produced for years.
