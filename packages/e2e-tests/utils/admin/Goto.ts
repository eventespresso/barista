import { visitAdminPage } from '@e2eUtils/wp';

/**
 * This class contains some utils to help you navifate to specific wp admin pages.
 */
export class Goto {
	/**
	 * Navigates to "/wp-admin/admin.php?page=espresso_events"
	 */
	static async eventsListPage() {
		await visitAdminPage('admin.php', 'page=espresso_events');
	}

	/**
	 * Navigates to "/wp-admin/admin.php?page=espresso_venues"
	 */
	static async venuesPage() {
		await visitAdminPage('admin.php', 'page=espresso_venues');
	}

	/**
	 * Navigates to "/wp-admin/plugins.php"
	 */
	static async pluginsPage() {
		await visitAdminPage('plugins.php');
	}

	/**
	 * Navigates to "/wp-admin/themes.php"
	 */
	static async themesPage() {
		await visitAdminPage('themes.php');
	}

	/**
	 * Navigates to "/wp-admin/options-permalink.php"
	 */
	 static async optionsPermalinkPage() {
		await visitAdminPage('options-permalink.php');
	}

	/**
	 * Navigates to "/wp-admin/options-permalink.php"
	 */
	 static async optionsGeneral() {
		await visitAdminPage('options-general.php');
	}
}
