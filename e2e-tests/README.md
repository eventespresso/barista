### README for End-to-End Tests

The general gist of scaffolding (creating) E2E is as follows:

-   file `MakeConfig.ts` checks for presence of environment variable `CAFE`
-   environment variable `BARISTA` is optional
-   environment variables can be either exported or loaded from `.ddev-env`
-   currently, `.ddev-env` file is hard-coded to the working directory for E2E package
-   file `MakeEnv.ts` _generates_ [DDEV](https://ddev.com/) config which allows variable number of [Playwright](https://playwright.dev/) projects
-   to inspect final result, navigate to `/tmp/ddev/<project-name>`
-   to generate config on demand, run `yarn ddev:make-config <project-name>`
-   to generate config _and_ start the environment, run `yarn ddev:make-env <project-name>`
-   as implementation details can change over time, refer to actual source code
