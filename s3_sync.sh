#!/bin/bash

set -e

GIT_BRANCH=`git branch | grep \* | cut -d ' ' -f2`

# For now let's have a master and develop version as we don't change docs often.
# Develop will contain the latest non-master version pushed to GitHub.
if [ "$GIT_BRANCH" != "master" ]; then
    GIT_BRANCH='develop'
fi

aws s3 sync --delete --acl public-read build s3://apify-docs/$GIT_BRANCH
