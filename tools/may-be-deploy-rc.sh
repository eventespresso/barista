#!/bin/bash

################################### INSTRUCTIONS ######################################
#                      This script accepts up to 2 arguments                           #
#-------------------------------------------------------------------------------------#
# # |                    Description                    | REQUIRED |      DEFAULT     #
#-------------------------------------------------------------------------------------#
# 1 | target repository name e.g. "event-espresso-core" |    YES   |         -        #
# 2 | yarn command to run e.g. "build:core"             |    YES   |         -        #
#######################################################################################

##################################### EXAMPLES ########################################
# ./deploy.sh "event-espresso-core" "build:core"                                      #
#######################################################################################

set -e

# name of the repo e.g. "event-espresso-core"
REPO=$1
# The yarn command to run e.g. "build:core"
YARN_COMMAND=$2

source tools/utils.sh

if remoteRepoHasRcBranch "$REPO"; then
    yarn "$YARN_COMMAND"
    echo "Deploying to $BRANCH on $REPO" 
    source tools/deploy.sh "$REPO" "$BRANCH"
else
    echo "Branch $BRANCH not found on $REPO" 
fi
