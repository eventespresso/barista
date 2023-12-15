#!/bin/bash

TOKEN=$1
REPO="${2:-cafe}"
BASE="${3:-DEV}"
HEAD=$4
TITLE=$5
BODY=$6
ASSIGNEE="${7:-garthkoyle,Saam01}"
REVIEWER="${8:-knazart}"
LABEL=$9

gh auth login --with-token "$TOKEN"

gh pr create --repo "eventespresso/$REPO" --base "$BASE" --head "$HEAD" --title "$TITLE" --body "$BODY" --assignee "$ASSIGNEE" --reviewer "$REVIEWER" --label "$LABEL"
