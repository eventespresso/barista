# Examples

## Login

Login operation is handled by default inside [setup-playwright.ts](./config/setup-playwright.ts). So, every test by default should land at the wp admin dashboard. If you still need to login as some other user, you can use `loginUser` utility function:

```ts
import { loginUser } from '@e2eUtils/wp';

beforeAll(async () => {
	await loginUser('username', 'password');
});

// write your test here
```

## Activating plugins

The Event Espresso Core plugin is active by default for E2E set up. If you need to activate any other plugin/addon, you can use [`wp-plugins-page`](./utils/admin/wp-plugins-page/index.ts) utils.

```ts
import { activatePlugin, deactivatePlugin } from '@e2eUtils/admin/wp-plugins-page';

const plugin = 'eea-mailchimp/ee4-mailchimp.php';

beforeAll(async () => {
	await activatePlugin(plugin);
});

// Ensure that you deactivate the plugin after you are done
// to make sure that the plugin doesn't interfere with other plugin UIs
afterAll(async () => {
	await deactivatePlugin(plugin);
});

// write your test here
```

## Navigating to common pages

You can use the `Goto` utility classes to navigate to the common pages. For example, to navigate inside `wp-admin`, you can use [`./utils/admin/Goto.ts`](./utils/admin/Goto.ts):

```ts
import { Goto } from '@e2eUtils/admin';

beforeAll(async () => {
	await Goto.eventsListPage();
});

// write your test here
```
