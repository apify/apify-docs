#!/bin/bash

set -e

GIT_BRANCH=`git branch | grep \* | cut -d ' ' -f2`

# For now let's have a master and develop version as we don't change docs often.
# Develop will contain the latest non-master version pushed to GitHub.
if [ "$GIT_BRANCH" != "master" ]; then
    echo "Deploying to Apiary as develop documentation..."
    export API_NAME="apify2staging"
else
    echo "Deploying to Apiary as production documentation..."
    export API_NAME="apify2prod"
fi

apiary publish --api-name=${API_NAME} --path="./api_v2_reference.apib"

if [ $? -ne 0 ]; then
    echo "ERROR: Cannot upload to Apiary (did you install apiary tool by running 'sudo gem install apiaryio'?)"
    exit 1
fi
