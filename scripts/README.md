# The build process

The scripts in this file provide assets that are ready to be parsed by browsers within the plugin `assets` folder.

## build.js

The `build.js` mirrors this [file](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/scripts/build.js) from CRA with some minor changes. For example, we don't need `copyPublicFolder` function, so it's removed.
This script creates the production build.

## test.js

The `test.js` script gathers test configurations and starts unit-testing through `jest`.

## watch.js

The `watch.js` script provides the development build for local development/debugging.

In future CRA upgrades, we need to take into account the changes in this [folder](https://github.com/facebook/create-react-app/tree/master/packages/react-scripts/scripts), if there is a need for a more modern build process.

## generateWorkspaces.js

This script generates a list of all the yarn workspaces and writes their name and location to [`workspaces.json`](../workspaces.json) file as an array. `workspaces.json` is then used by the build configuration to pass the appropriate file entries to webpack.

This script should be run on yarn postinstall
