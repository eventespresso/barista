import { switchUserToAdmin } from './switch-user-to-admin';
import { switchUserToTest } from './switch-user-to-test';
import { visitAdminPage } from './visit-admin-page';
import { isPluginNetworkActive } from './isPluginNetworkActive';

/**
 * Activates an installed plugin.
 *
 * @param {string} plugin Path to the plugin file, relative to the plugins directory.
 */
export async function activatePlugin(plugin) {
	await switchUserToAdmin();
	await visitAdminPage('plugins.php', null);

	if (await isPluginNetworkActive(plugin)) {
		console.log(`Plugin "${plugin}" is network active.`);
	} else {
		try {
			await page.click(`tr[data-plugin="${plugin}"] .activate a`);
			console.log(`Activated plugin "${plugin}".`);
		} catch (error) {
			console.log(`Could not activate the plugin "${plugin}". May be it's already active.`);
		}
	}

	await switchUserToTest();
}
