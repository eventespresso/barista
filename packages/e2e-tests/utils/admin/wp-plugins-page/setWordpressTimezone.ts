import { switchUserToAdmin } from '@e2eUtils/wp';
import { Goto } from '@e2eUtils/admin';

/**
 * Set WordPress Timezone
 */
export async function setWordpressTimezone(): Promise<void> {
	await switchUserToAdmin();
	await Goto.optionsGeneral();

	const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	await page.selectOption('#timezone_string', timeZone);
	
	await page.click('#submit');
}
