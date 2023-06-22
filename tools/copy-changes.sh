#!/bin/bash

# | - | ------------------- | ------------------------------------------- | ------------------------- |
# | # | VAR NAME            | DESCRIPTION                                 | DEFAULT                   |
# | - | ------------------- | ------------------------------------------- | ------------------------- |
# | 1 | ASSETS_PATH         | path to assets folder on the target repo    | assets                    |
# | 2 | I18N_PATH           | path to languages folder on the target repo | languages                 |
# | 3 | BUILD_PATH          | build path on the current/this repo         | build                     |
# | 4 | REPO_DIR            | path to target repository                   | cafe                      |
# | 5 | REMOVE_JS_I18N_FILE | delete JS pot file?              			  | yes                       |
# | 6 | DEPLOY_ASSETS       | copy build files to target assets folder    | yes                       |
# | - | ------------------- | ------------------------------------------- | ------------------------- |

set -e

# colors
CYAN='\033[0;36m'
RED='\033[0;31m'
RESET='\033[0m'

BASE_DIR=$(dirname "$GITHUB_WORKSPACE")

# Default path to assets folder (on target repo)
ASSETS_PATH="${1:-assets}"

# Default path to languages folder (on target repo)
I18N_PATH="${2:-languages}"

# Default path to build folder
BUILD_PATH="${3:-build}"
BUILD_PATH="${GITHUB_WORKSPACE:?}/$BUILD_PATH"

# path to the repo ex: "/home/runner/work/barista/cafe"
REPO_DIR=${4:-cafe}
REPO_DIR="${BASE_DIR:?}/$REPO_DIR"

REMOVE_JS_I18N_FILE=${5:-yes}
DEPLOY_ASSETS=${6:-yes}

if [[ -z "$REPO_DIR" ]]; then
	printf "\n%b REPO_DIR is undefined%b\n" "$RED" "$RESET"
	exit 1
fi
if [[ -z "$ASSETS_PATH" ]]; then
	printf "\n%b ASSETS_PATH is undefined%b\n" "$RED" "$RESET"
	exit 1
fi
if [[ -z "$I18N_PATH" ]]; then
	printf "\n%b I18N_PATH is undefined%b\n" "$RED" "$RESET"
	exit 1
fi
if [[ -z "$BUILD_PATH" ]]; then
	printf "\n%b BUILD_PATH is undefined%b\n" "$RED" "$RESET"
	exit 1
fi

printf "\n%bBUILD_PATH: %s%b" "$CYAN" "$BUILD_PATH" "$RESET"
printf "\n%bREPO_DIR: %s%b" "$CYAN" "$REPO_DIR" "$RESET"
# printf "\n%bchanging directory: %s%b" "$CYAN" "$REPO_DIR" "$RESET"
# cd "$REPO_DIR"

## DEPLOY I18N ##
# paths of the translation files
PHP_I18N_FILE="$REPO_DIR/$I18N_PATH/event_espresso-translations-js.php"
JS_I18N_FILE="$BUILD_PATH/js-translations.pot"

# If DEPLOY_I18N is not set to "no"
if [ "$DEPLOY_I18N" != "no" ]; then
	## make sure languages directory exists
	mkdir -p "$REPO_DIR/$I18N_PATH"
	# make sure the file exists
	touch "$PHP_I18N_FILE"
	# Convert POT file to PHP
	printf "\n%bconverting pot to PHP...%b\n" "$CYAN" "$RESET"
	npx pot-to-php "$JS_I18N_FILE" "$PHP_I18N_FILE" event_espresso
fi

# If REMOVE_JS_I18N_FILE is not set to "no"
if [ "$REMOVE_JS_I18N_FILE" != "no" ]; then
	# Remove POT file
	printf "\n%bremove JS pot file%b\n" "$CYAN" "$RESET"
	rm -f "$JS_I18N_FILE"
fi

# # goto the repo directory
# cd "$REPO_DIR"

# If DEPLOY_ASSETS is not set to "no"
if [ "$DEPLOY_ASSETS" != "no" ]; then
	# clean the assets path.
	printf "\n%bcleaning up assets path...%b\n" "$CYAN" "$RESET"
	rm -rf "$REPO_DIR/$ASSETS_PATH"/static/*
	rm -f "$REPO_DIR/$ASSETS_PATH"/asset-manifest.json

	# Make sure the directory exists
	mkdir -p "$REPO_DIR/$ASSETS_PATH"

	# copy files from build folder to target assets folder
	# ex: cp -r /home/runner/work/barista/cafe/wp-content/plugins/barista/build/*
	# 			/home/runner/work/barista/cafe/wp-content/plugins/event-espresso-core/assets/
	printf "\n%bcopy build files to assets path...%b\n" "$CYAN" "$RESET"
	cp -r "$BUILD_PATH"/* "$REPO_DIR/$ASSETS_PATH/"
fi
