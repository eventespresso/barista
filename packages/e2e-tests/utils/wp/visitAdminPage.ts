import { join } from 'path';

import { createURL } from './createURL';
import { isCurrentURL } from './isCurrentURL';
import { loginUser } from './loginUser';
import { getPageError } from './getPageError';

/**
 * Visits admin page; if user is not logged in then it logging in it first, then visits admin page.
 *
 * @param {string} adminPath String to be serialized as pathname.
 * @param {string} query String to be serialized as query portion of URL.
 */
export async function visitAdminPage(adminPath: string, query = ''): Promise<void> {
	const adminPage = createURL(join('wp-admin', adminPath), query);

	await page.goto(adminPage);

	if (isCurrentURL('wp-login.php')) {
		await loginUser();
		await visitAdminPage(adminPath, query);
	}

	const error = await getPageError();
	if (error) {
		throw new Error('Unexpected error in page content: ' + error);
	}
}
