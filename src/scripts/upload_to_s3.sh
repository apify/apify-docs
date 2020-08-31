#!/bin/bash

set -e

GIT_BRANCH=`git branch | grep \* | cut -d ' ' -f2`
S3_PREFIX="s3://apify-docs/${GIT_BRANCH}"

echo "Deploying branch: \"${GIT_BRANCH}\" to \"${S3_PREFIX}\""

aws s3 rm --recursive "${S3_PREFIX}"
aws s3 sync --acl public-read build "${S3_PREFIX}"
