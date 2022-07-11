import { switchUserToAdmin, switchUserToTest } from '@e2eUtils/wp';
import { EE_DEBUG } from '@e2eUtils/misc';
import { Goto } from '@e2eUtils/admin';

import { isPluginNetworkActive } from './isPluginNetworkActive';

/**
 * Change Permalink
 */
export async function changePermalink(): Promise<void> {
	await switchUserToAdmin();
	await Goto.optionsPermalinkPage();
	await page.check('input[value="/%postname%/"]');
	await page.click(`#submit`);
}