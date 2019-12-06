#!/bin/bash

set -e

GIT_BRANCH=$TRAVIS_BRANCH
[ -z "$GIT_BRANCH" ] && GIT_BRANCH=`git branch | grep \* | cut -d ' ' -f2`

# For now let's have a master and develop version as we don't change docs often.
# Develop will contain the latest non-master version pushed to GitHub.
if [ "$GIT_BRANCH" != "master" ]; then
    aws s3 sync --delete --exclude master --acl public-read build s3://apify-docs/develop
else
    aws s3 sync --delete --exclude develop --acl public-read build s3://apify-docs/master
fi
