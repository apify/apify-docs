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

const ACTOR_IAM_PERMISSIONS = {
    READ: 'ACTOR.READ',
    WRITE: 'ACTOR.WRITE',
    RUN: 'ACTOR.RUN',
    BUILD: 'ACTOR.BUILD',
    DELETE: 'ACTOR.DELETE',
    VIEW_RUNS: 'ACTOR.VIEW_RUNS',
    MANAGE_ACCESS_RIGHTS: 'ACTOR.MANAGE_ACCESS_RIGHTS',
};

# **^^ Should we include the `ACTOR.RUN` part as well?**

|Permission|Description|
|---|---|
|Read|View actor settings, source code and builds.|
|Write|Edit actor settings and source code.|
|Run|Run any of the actor's builds.|
|Delete|Remove the actor.|
|View runs|View a list of the actor's runs and their details.|
|Manage access rights|Manage access rights to the actor.|

### [](#actor-run) Actor run

const ACTOR_RUN_IAM_PERMISSIONS = {
    READ: 'ACTOR_RUN.READ',
    METAMORPH: 'ACTOR_RUN.METAMORPH',
    RESURRECT: 'ACTOR_RUN.RESURRECT',
    ABORT: 'ACTOR_RUN.ABORT',
};

### [](#build) Build

const ACTOR_BUILD_IAM_PERMISSIONS = {
    READ: 'ACTOR_BUILD.READ',
    ABORT: 'ACTOR_BUILD.ABORT',
};

### [](#actor-task) Actor task

const ACTOR_TASK_IAM_PERMISSIONS = {
    READ: 'ACTOR_TASK.READ',
    WRITE: 'ACTOR_TASK.WRITE',
    DELETE: 'ACTOR_TASK.DELETE',
    VIEW_RUNS: 'ACTOR_TASK.VIEW_RUNS',
    MANAGE_ACCESS_RIGHTS: 'ACTOR_TASK.MANAGE_ACCESS_RIGHTS',
};

## [](#storage-permissions)

For more information about Storage, see its [documentation]({{@link storage.md}}).

### [](#dataset) Dataset

const DATASET_IAM_PERMISSIONS = {
    READ: 'DATASET.READ',
    WRITE: 'DATASET.WRITE',
    DELETE: 'DATASET.DELETE',
    MANAGE_ACCESS_RIGHTS: 'DATASET.MANAGE_ACCESS_RIGHTS',
};

### [](#key-value-store) Key-value-store

const KEY_VALUE_STORE_IAM_PERMISSIONS = {
    READ: 'KEY_VALUE_STORE.READ',
    WRITE: 'KEY_VALUE_STORE.WRITE',
    DELETE: 'KEY_VALUE_STORE.DELETE',
    MANAGE_ACCESS_RIGHTS: 'KEY_VALUE_STORE.MANAGE_ACCESS_RIGHTS',
};

### [](#request-queue) Request queue

const REQUEST_QUEUE_IAM_PERMISSIONS = {
    READ: 'REQUEST_QUEUE.READ',
    WRITE: 'REQUEST_QUEUE.WRITE',
    DELETE: 'REQUEST_QUEUE.DELETE',
    MANAGE_ACCESS_RIGHTS: 'REQUEST_QUEUE.MANAGE_ACCESS_RIGHTS',
};

## [](#schedule-permissions) Schedule permissions

const SCHEDULE_IAM_PERMISSIONS = {
    READ: 'SCHEDULE.READ',
    WRITE: 'SCHEDULE.WRITE',
    DELETE: 'SCHEDULE.DELETE',
};

## [](#proxy-permissions) Proxy permissions

const PROXY_IAM_PERMISSIONS = {
    USE: 'PROXY.USE',
};

## [](#user-permissions) User permissions

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
