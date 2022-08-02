import { switchUserToAdmin, switchUserToTest } from '@e2eUtils/wp';
import { Goto } from '@e2eUtils/admin';

/**
 * Activates an installed plugin.
 *
 * @param {string} theme Path to the theme file, relative to the theme directory.
 */
export async function activateTheme(theme: string): Promise<void> {
	await switchUserToAdmin();
	await Goto.themesPage();

	const themeIsActive =  await page.$eval('div[data-slug="'+ theme +'"]', el => el.classList.contains("active"));
	
	if(!themeIsActive){
		await page.click('div[data-slug="'+ theme +'"] a.activate');
	}

	await switchUserToTest();
}
