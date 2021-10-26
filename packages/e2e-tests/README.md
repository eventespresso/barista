## Prerequisites

`wp-env` requires Docker to be installed. There are instructions available for installing Docker on [Windows 10 Pro](https://docs.docker.com/docker-for-windows/install/), [all other versions of Windows](https://docs.docker.com/toolbox/toolbox_install_windows/), [macOS](https://docs.docker.com/docker-for-mac/install/), and [Linux](https://docs.docker.com/v17.12/install/linux/docker-ce/ubuntu/#install-using-the-convenience-script).

Node.js and NPM are required. The latest LTS version of Node.js is used to develop `wp-env` and is recommended.

## Usage

### Starting the environment

First, ensure that Docker is running. You can do this by clicking on the Docker icon in the system tray or menu bar.

Then, change to the barista directory:

```sh
$ cd ~/barista
```

Then, start the local environment:

```sh
$ yarn wp-env start
```

Finally, navigate to http://localhost:8888 in your web browser to see WordPress running with the local WordPress plugin or theme running and activated. Default login credentials are username: `admin` password: `password`.

## Playwright

Playwright is the headless end-to-end library for testing user interactions with the app.
Given `wp-env` environment `playwright` provides the [APIs](https://playwright.dev/docs/api/class-playwright) needed to interact with it's browsers: Chromium, WebKit and Firefox.

### Playwright test runner

Currently, we're using [Jest as a test runner](https://github.com/playwright-community/jest-playwright). As an alternative there is Playright's own [runner](https://github.com/microsoft/playwright-test).

### Headless mode

By default `playwright` runs in headless mode, but for local debugging, we can run tests in headful mode by setting environment variable `HEADLESS` to `false`. For example, `HEADLESS=false yarn test:e2e` (For Unix), `Set HEADLESS=false; yarn test:e2e` (Windows).
If there is a need to focus on a single test, we can use: `HEADLESS=false yarn test:e2e packages/e2e-tests/specs/dummy.test.ts`.

### Examples

You can see some examples [here](./examples.md).
