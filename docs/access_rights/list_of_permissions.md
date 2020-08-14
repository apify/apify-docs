---
title: List of permissions
description: See a list of all the available permissions for Apify actors, etc.
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
|Metamorph|Metamorph actor run.|
|Resurrect|Resurrect actor run.|
|Abort|Abort actor run.|

### [](#build) Build

|Permission|Description|
|---|---|
|Read|View actor build details and log.|
|Abort|Abort actor build.|

### [](#actor-task) Actor task

|Permission|Description|
|---|---|
|Read|View task configuration.|
|Write|Edit task configuration and settings.|
|Delete|Remove the task.|
|View runs|View a list of actor task runs and their details.|
|Manage access rights|Manage actor task access rights.|

## [](#storage-permissions)

For more information about Storage, see its [documentation]({{@link storage.md}}).

### [](#dataset) Dataset

|Permission|Description|
|---|---|
|Read|View dataset information and its data.|
|Write|Edit dataset settings and push data to it.|
|Delete|Remove the dataset.|
|Manage access rights|Manage dataset access rights.|

### [](#key-value-store) Key-value-store

|Permission|Description|
|---|---|
|Read|View key-value store details and records.|
|Write|Edit key-value store settings and add, update or <br/> remove its records.|
|Delete|Remove key-value store.|
|Manage access rights|Manage key-value store access rights.|

### [](#request-queue) Request queue

|Permission|Description|
|---|---|
|Read|View request queue details and records.|
|Write|Edit request queue settings and add, update or <br/> remove its records.|
|Delete|Remove request queue.|
|Manage access rights|Manage request queue access rights.|

## [](#schedule-permissions) Schedule permissions

|Permission|Description|
|---|---|
|Read|View schedule settings and scheduled actors/tasks.|
|Write|Edit schedule settings and scheduled actors/tasks.|
|Delete|Remove the schedule.|

## [](#proxy-permissions) Proxy permissions

|Permission|Description|
|---|---|
|Use proxy|Allow to use Apify Proxy.|

## [](#user-permissions) User permissions

(***Is this in Organization account?***)

const USER_IAM_PERMISSIONS = {
    MANAGE_ACCESS_KEYS: 'USER.MANAGE_ACCESS_KEYS',
    // TODO: VIEW_USAGE: userProxyGroupsDailyStatsPub, userAct2JobsDailyStatsPub, userProxyServersMonthlyStatsPub
    UPDATE_SUBSCRIPTION: 'USER.UPDATE_SUBSCRIPTION',
    UPDATE_PROFILE: 'USER.UPDATE_PROFILE',
    UPDATE_EMAIL: 'USER.UPDATE_EMAIL',
    RESET_PASSWORD: 'USER.RESET_PASSWORD',
    REMOVE_ACCOUNT: 'USER.REMOVE_ACCOUNT',
    VIEW_NOTIFICATIONS: 'USER.VIEW_NOTIFICATIONS',
    ACKNOWLEDGE_NOTIFICATIONS: 'USER.ACKNOWLEDGE_NOTIFICATIONS',
    VIEW_INVOICES: 'USER.VIEW_INVOICES',
    MANAGE_ORGANIZATION: 'USER.MANAGE_ORGANIZATION',
};

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



9:34
PROJECT_IAM_PERMISSIONS, OFFER_IAM_PERMISSIONS, COMMENTS_IAM_PERMISSIONS, ISSUES_IAM_PERMISSIONS
 all belong to marketplace might be unified under a single 1 - MANAGE_MARKETPLACE (edited)
