#!/bin/bash

set -e

GIT_BRANCH=`git branch | grep \* | cut -d ' ' -f2`
S3_PREFIX="s3://apify-docs/${GIT_BRANCH}"

echo "Uploading artifacts for branch \"${GIT_BRANCH}\" to \"${S3_PREFIX}\""

# TODO: add back the removed --delete param after web deploy
# The --delete removes content in bucket that isn't in the repo, so this way we can have both there at the same time
# until the web part gets deployed

# aws s3 sync --delete --acl public-read build "${S3_PREFIX}"
aws s3 sync --acl public-read build "${S3_PREFIX}"
