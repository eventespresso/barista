/**
 * External dependencies
 */
import { join } from 'path';

/**
 * Internal dependencies
 */
import { createURL } from './create-url';
import { isCurrentURL } from './is-current-url';
import { loginUser } from './login-user';
import { getPageError } from './get-page-error';

/**
 * Visits admin page; if user is not logged in then it logging in it first, then visits admin page.
 *
 * @param {string} adminPath String to be serialized as pathname.
 * @param {string} query String to be serialized as query portion of URL.
 */
export async function visitAdminPage(adminPath, query) {
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
