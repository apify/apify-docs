#!/bin/bash

set -e

if [ $# -eq 0 ]; then
    echo "No branch name supplied, using git CLI to get the current branch"
    GIT_BRANCH=`git branch | grep \* | cut -d ' ' -f2`
else
    GIT_BRANCH=$1
fi

S3_PREFIX="s3://apify-docs/${GIT_BRANCH}"

echo "Removing \"${S3_PREFIX}\""
aws s3 rm --recursive "${S3_PREFIX}"
