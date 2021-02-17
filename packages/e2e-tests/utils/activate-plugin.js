import { switchUserToAdmin } from './switch-user-to-admin';
import { switchUserToTest } from './switch-user-to-test';
import { visitAdminPage } from './visit-admin-page';

/**
 * Activates an installed plugin.
 *
 * @param {string} slug Plugin slug.
 */
export async function activatePlugin(slug) {
	await switchUserToAdmin();
	await visitAdminPage('plugins.php', null);

	const disableLink = await page
		.$eval(`tr[data-slug="${slug}"] .deactivate a`, (el) => el.innerHTML)
		.catch(console.log);

	if (disableLink) {
		await switchUserToTest();
		return;
	}

	await page.click(`tr[data-slug="${slug}"] .activate a`).catch(console.log);

	await switchUserToTest();
}
