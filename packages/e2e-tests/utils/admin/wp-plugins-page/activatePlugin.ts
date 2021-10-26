import { switchUserToAdmin, switchUserToTest } from '@e2eUtils/wp';
import { EE_DEBUG } from '@e2eUtils/misc';
import { Goto } from '@e2eUtils/admin';

import { isPluginNetworkActive } from './isPluginNetworkActive';

/**
 * Activates an installed plugin.
 *
 * @param {string} plugin Path to the plugin file, relative to the plugins directory.
 */
export async function activatePlugin(plugin: string): Promise<void> {
	await switchUserToAdmin();
	await Goto.pluginsPage();

	if (await isPluginNetworkActive(plugin)) {
		EE_DEBUG && console.log(`Plugin "${plugin}" is network active.`);
	} else {
		try {
			await page.click(`tr[data-plugin="${plugin}"] .activate a`);

			EE_DEBUG && console.log(`Activated plugin "${plugin}".`);
		} catch (error) {
			EE_DEBUG && console.log(`Could not activate the plugin "${plugin}". May be it's already active.`);
		}
	}

	await switchUserToTest();
}
