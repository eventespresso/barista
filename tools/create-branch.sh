#!/bin/bash

# | - | ----------- | ------------------------------------------- | ------------------------- |
# | # | VAR NAME    | DESCRIPTION                                 | DEFAULT                   |
# | - | ----------- | ------------------------------------------- | ------------------------- |
# | 1 | BRANCH      | name of new branch to create                |                           |
# | - | ----------- | ------------------------------------------- | ------------------------- |

set -e

# colors
CYAN='\033[0;36m'
RED='\033[0;31m'
RESET='\033[0m'

# name of new branch to create
BRANCH="$1"

if [[ -z "$BRANCH" ]]; then
	printf "\n%b BRANCH is undefined%b\n" "$RED" "$RESET"
	exit 1
fi

# Convert "refs/heads/dev" to "dev"
BRANCH="${BRANCH#refs/heads/}"

printf "\n%b creating branch %s%b\n" "$CYAN" "$BRANCH" "$RESET"
git branch "$BRANCH"
git status
