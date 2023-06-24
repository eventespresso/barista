#!/bin/bash

# | - | ----------- | ------------------------------------------- | ------------------------- |
# | # | VAR NAME    | DESCRIPTION                                 | DEFAULT                   |
# | - | ----------- | ------------------------------------------- | ------------------------- |
# | 1 | BRANCH      | name of new branch to create                |                           |
# | 2 | BASE_BRANCH | base branch for new branch in target repo   | DEV                       |
# | 3 | REPO_NAME   | target repository name                      | cafe                      |
# | - | ----------- | ------------------------------------------- | ------------------------- |

set -e

# colors
CYAN='\033[0;36m'
RED='\033[0;31m'
RESET='\033[0m'

BASE_DIR=$(dirname "$GITHUB_WORKSPACE")

# name of new branch to create
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

printf "\n%bchanging directory: %s%b\n" "$CYAN" "$REPO_DIR" "$RESET"
cd "$REPO_DIR"
git checkout "$BASE_BRANCH"

printf "\n%b creating branch %s%b\n" "$CYAN" "$BRANCH" "$RESET"
git branch "$BRANCH"
git checkout "$BRANCH"
git status
