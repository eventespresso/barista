#!/bin/bash

TOKEN=$1
REPO=$2
BASE="${3:-main}"
HEAD=$4
TITLE=$5
BODY=$6
ASSIGNEE="${7:-garthkoyle,Saam01}"
REVIEWER="${8:-knazart}"
LABEL=$9

gh auth login --with-token "$TOKEN"

gh pr create --repo "$REPO" --base "$BASE" --head "$HEAD" --title "$TITLE" --body "$BODY" --assignee "$ASSIGNEE" --reviewer "$REVIEWER" --label "$LABEL"
