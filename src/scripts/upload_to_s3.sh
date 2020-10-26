#!/bin/bash

set -e

GIT_BRANCH=`git branch | grep \* | cut -d ' ' -f2`
S3_PREFIX="s3://apify-docs/${GIT_BRANCH}"

echo "Uploading artifacts for branch \"${GIT_BRANCH}\" to \"${S3_PREFIX}\""

aws s3 sync --delete --acl public-read build "${S3_PREFIX}"
