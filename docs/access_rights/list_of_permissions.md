---
title: List of permissions
description: Learn about the access rights you can grant to other users. See a list of all the permissions for Apify resources such as actors, actor runs/tasks and storage.
menuWeight: 8.2
paths:
    - access-rights/list-of-permissions
---

# List of permissions

Below you can find descriptions of every permission that can be granted on the Apify platform.

## [](#actor-permissions) Actor permissions

For more information about Apify actors, see the actors' [documentation]({{@link actors.md}}).

### [](#actor) Actor

|Permission|Description|
|---|---|
|Read|View actor settings, source code and builds.|
|Write|Edit actor settings and source code.|
|Run|Run any of an actor's builds.|
|Delete|Remove the actor.|
|View runs|View a list of actor runs and their details.|
|Manage access rights|Manage actor access rights.|

### [](#actor-run) Actor run

|Permission|Description|
|---|---|
|Read|View actor run details and log.|
|Metamorph|Transform an actor run into another actor.|
|Resurrect|Resurrect actor run.|
|Abort|Abort actor run.

For more information on actor runs, see the [documentation]({{@link actors/running.md}}).

### [](#build) Build

|Permission|Description|
|---|---|
|Read|View actor build details and log.|
|Abort|Abort actor build.|

For more information on builds, see the [documentation]({{@link actors/development/builds.md}}).

### [](#actor-task) Actor task

|Permission|Description|
|---|---|
|Read|View task configuration.|
|Write|Edit task configuration and settings.|
|Delete|Remove the task.|
|View runs|View a list of actor task runs and their details.|
|Manage access rights|Manage actor task access rights.|

For more information on actor tasks, see the [documentation]({{@link actors/tasks.md}}).

## [](#storage-permissions)

For more information about Storage, see its [documentation]({{@link storage.md}}).

### [](#dataset) Dataset

|Permission|Description|
|---|---|
|Read|View dataset information and its data.|
|Write|Edit dataset settings and push data to it.|
|Delete|Remove the dataset.|
|Manage access rights|Manage dataset access rights.|

For more information on dataset storage, see its [documentation]({{@link storage/dataset.md}}).

### [](#key-value-store) Key-value-store

|Permission|Description|
|---|---|
|Read|View key-value store details and records.|
|Write|Edit key-value store settings and add, update or <br/> remove its records.|
|Delete|Remove key-value store.|
|Manage access rights|Manage key-value store access rights.|

For more information on key-value stores, see the [documentation]({{@link storage/key_value_store.md}}).

### [](#request-queue) Request queue

|Permission|Description|
|---|---|
|Read|View request queue details and records.|
|Write|Edit request queue settings and add, update or <br/> remove its records.|
|Delete|Remove request queue.|
|Manage access rights|Manage request queue access rights.|

For more information on request queue storage, see its [documentation]({{@link storage/request_queue.md}}).

## [](#schedule-permissions) Schedule permissions

|Permission|Description|
|---|---|
|Read|View schedule settings and scheduled actors/tasks.|
|Write|Edit schedule settings and scheduled actors/tasks.|
|Delete|Remove the schedule.|

For more information on schedules, see the [documentation]({{@link schedules.md}}).

## [](#proxy-permissions) Proxy permissions

|Permission|Description|
|---|---|
|Use proxy|Allow to use Apify Proxy.|

For more information on Apify Proxy, see its [documentation]({{@link proxy.md}}).

## [](#user-permissions) User permissions

|Permission|Description|
|---|---|
|Manage access keys|Manage account access keys.|
|Update subscription|Update the type of subscription.|
|Update profile|Make changes in profile information.|
|Update email|Update the contact email for the account.|
|Reset password|Reset the account's password.|
|Remove account|Remove an account from an organization.|
|View notifications|Receive notifications from actor and task runs.|
|Acknowledge notifications|Mark notifications as *seen*.|
|View invoices|See the account's invoices.|
|Manage organization|Change the organization's settings.|

## [](#marketplace-permissions) Marketplace permissions

### [](#project) Project

const PROJECT_IAM_PERMISSIONS = {
    READ: 'PROJECT.READ',
    WRITE: 'PROJECT.WRITE',
    ACCEPT_SOLUTION: 'PROJECT.ACCEPT_SOLUTION',
    CREATE_OFFER: 'PROJECT.CREATE_OFFER',
    DEVELOPER_ACCESS: 'PROJECT.DEVELOPER_ACCESS',
    POST_REVIEW: 'PROJECT.POST_REVIEW',
};

### [](#offer) Offer

const OFFER_IAM_PERMISSIONS = {
    READ: 'OFFER.READ',
    WRITE: 'OFFER.WRITE',
    ACCEPT_OFFER: 'OFFER.ACCEPT_OFFER',
    REJECT_OFFER: 'OFFER.REJECT_OFFER',
};

### [](#comments) Comments

const COMMENTS_IAM_PERMISSIONS = {
    READ: 'COMMENT.READ',
    WRITE: 'COMMENT.WRITE',
    UPDATE: 'COMMENT.UPDATE',
};

### [](#issues) Issues

const ISSUES_IAM_PERMISSIONS = {
    READ: 'ISSUE.READ',
    WRITE: 'ISSUE.WRITE',
    ADD_ADDITIONAL_EMAILS: 'ISSUE.ADD_ADDITIONAL_EMAILS',
    UPDATE_STATUS: 'ISSUE.UPDATE_STATUS',
};



**NOTE**
PROJECT_IAM_PERMISSIONS, OFFER_IAM_PERMISSIONS, COMMENTS_IAM_PERMISSIONS, ISSUES_IAM_PERMISSIONS
 all belong to marketplace might be unified under a single 1 - MANAGE_MARKETPLACE (edited)
