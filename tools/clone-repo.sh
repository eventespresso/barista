#!/bin/bash

# This script accepts up to 7 arguments
# | - | ----------- | ------------------------------------------- | ------------------------- |
# | # | VAR NAME    | DESCRIPTION                                 | DEFAULT                   |
# | - | ----------- | ------------------------------------------- | ------------------------- |
# | 1 | BRANCH      | target repo branch to checkout              | DEV                       |
# | 2 | ORG         | organization of the target repo             | eventespresso             |
# | 3 | REPO        | target repository name                      | cafe                      |
# | - | ----------- | ------------------------------------------- | ------------------------- |

set -e

# colors
CYAN='\033[0;36m'
RED='\033[0;31m'
RESET='\033[0m'

# The target repo branch to checkout during clone
BRANCH="${1:-DEV}"
# Convert "refs/heads/DEV" to "DEV"
BRANCH="${BRANCH#refs/heads/}"
# GitHub account organization
ORG="${2:-eventespresso}"
# name of the repo e.g. "event-espresso-core"
REPO=${3:-cafe}

if [[ -z "$BRANCH" ]]; then
	printf "\n%b BRANCH is undefined%b\n" "$RED" "$RESET"
	exit 1
fi

if [[ -z "$ORG" ]]; then
	printf "\n%b ORG is undefined%b\n" "$RED" "$RESET"
	exit 1
fi

if [[ -z "$REPO" ]]; then
	printf "\n%b REPO is undefined%b\n" "$RED" "$RESET"
	exit 1
fi

printf "\n%bcloning repo: %s%b\n" "$CYAN" "$REPO" "$RESET"
# make sure the directory is empty
rm -rf "$REPO"

# clone the repo branch
git clone -b "$BRANCH" "git@github.com:$ORG/$REPO.git"

printf "\n%bchanging directory: %s%b\n" "$CYAN" "$REPO" "$RESET"
cd "$REPO"
