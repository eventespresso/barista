#!/bin/bash

# | - | ----------- | ------------------------------------------- | ------------------------- |
# | # | VAR NAME    | DESCRIPTION                                 | DEFAULT                   |
# | - | ----------- | ------------------------------------------- | ------------------------- |
# | 1 | BRANCH      | new branch to commit changes to             |                           |
# | 3 | BASE_BRANCH | branch to deploy at, in the target repo     | DEV                       |
# | 2 | REPO_NAME   | target repository name                      | cafe                      |
# | - | ----------- | ------------------------------------------- | ------------------------- |

# DEFAULT ENV VARIABLES SET BY GITHUB
# @link https://docs.github.com/en/actions/configuring-and-managing-workflows/using-environment-variables#default-environment-variables
# 1. GITHUB_REPOSITORY
# 2. GITHUB_SHA

set -e

# colors
CYAN='\033[0;36m'
RED='\033[0;31m'
RESET='\033[0m'

BASE_DIR=$(dirname "$GITHUB_WORKSPACE")

# nameof new branch to commit changes to
BRANCH="$1"
# Convert "refs/heads/dev" to "dev"
BRANCH="${BRANCH#refs/heads/}"
# The target repo branch to base new branch off of
BASE_BRANCH="${2:-DEV}"
# Convert "refs/heads/dev" to "dev"
BASE_BRANCH="${BASE_BRANCH#refs/heads/}"
# name of the repo e.g. "event-espresso-core"
REPO_NAME=${3:-cafe}
REPO_DIR="${BASE_DIR:?}/$REPO_NAME"

if [[ -z "$BRANCH" ]]; then
	printf "\n%b BRANCH is undefined%b\n" "$RED" "$RESET"
	exit 1
fi

if [[ -z "$REPO_NAME" ]]; then
	printf "\n%b REPO_NAME is undefined%b\n" "$RED" "$RESET"
	exit 1
fi

if [[ -z "$BASE_BRANCH" ]]; then
	printf "\n%b BASE_BRANCH is undefined%b\n" "$RED" "$RESET"
	exit 1
fi

# the source commit SHA with repo URL
SOURCE_COMMIT="${GITHUB_REPOSITORY}@${GITHUB_SHA}"

printf "\n%bchanging directory: %s%b\n" "$CYAN" "$REPO_DIR" "$RESET"
cd "$REPO_DIR"
git checkout "$BASE_BRANCH"

# Commit if there is anything to
if [ -n "$(git status --porcelain)" ]; then
	printf "\n%bcommitting changes to: %s%b\n" "$CYAN" "$REPO_NAME" "$RESET"
	# Stage all files
	git add .
	# add source commit to track the deployment source
	git commit --message "Deployed from $SOURCE_COMMIT"

	printf "\n%pushing %s branch to %s repo%b\n" "$CYAN" "$BRANCH" "$REPO_NAME" "$RESET"
	git push --set-upstream origin "$BRANCH"
else
	printf "\n%bNo changes%b\n" "$CYAN" "$RESET"
fi
