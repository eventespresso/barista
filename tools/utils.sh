#!/bin/bash

##################### ENV VARIABLES THAT SHOULD ALREADY BE SET ########################
#-------------------------------------------------------------------------------------#
#             Name            |                       Description                     #
#-------------------------------------------------------------------------------------#
# API_TOKEN_GITHUB            | Github access token                                   #
#######################################################################################

####################### DEFAULT ENV VARIABLES SET BY GITHUB ###########################
# @link https://docs.github.com/en/actions/configuring-and-managing-workflows/using-environment-variables#default-environment-variables
# 1. GITHUB_REF

set -e

# GitHub account username
USERNAME="eventespresso"
# Convert "refs/heads/rc-branch" to "rc-branch"
BRANCH="${GITHUB_REF#refs/heads/}"

# Checks whether the passed repo has the RC branch
remoteRepoHasRcBranch() {
	repo="$1"
	url="https://${API_TOKEN_GITHUB}@github.com/${USERNAME}/${repo}.git"
	has_branch=$(git ls-remote --heads "${url}" "${BRANCH}")

	if [[ "${has_branch}" ]]; then
		return
	else
		false
	fi
}

## declare an array of target repos
declare -a arr=(
	"event-espresso-core"
	"eea-recurring-events-manager"
)

checkForRcBranches() {
	## now loop through the array
	for repo in "${arr[@]}"; do
		# If there is a remote branch for the repo
		if remoteRepoHasRcBranch "${repo}"; then
			echo "${BRANCH} branch found in ${repo}"
			# return success
			return 0
		fi
	done
	echo "No target RC branch found!"
	exit 1
}
