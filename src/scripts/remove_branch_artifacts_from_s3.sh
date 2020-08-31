#!/bin/bash

set -e

GIT_BRANCH=`git branch | grep \* | cut -d ' ' -f2`
S3_PREFIX="s3://apify-docs/${GIT_BRANCH}"

echo "Removing \"${S3_PREFIX}\""
aws s3 rm --recursive "${S3_PREFIX}"
