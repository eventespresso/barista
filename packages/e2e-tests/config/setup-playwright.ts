import '@testing-library/jest-dom';

import { activatePlugin, deactivatePlugin } from '../utils/admin/wp-plugins-page';
import { Goto, DefaultSettingsManager } from '../utils/admin';
import { loginUser } from '../utils/wp';

// The Jest timeout is increased because these tests are a bit slow
jest.setTimeout(300000);

const defaultSettingsManager = new DefaultSettingsManager();

// Before every test suite run, delete all content created by the test. This ensures
// other posts/comments/etc. aren't dirtying tests and tests don't depend on
// each other's side-effects.
beforeAll(async () => {
	await loginUser();

	await activatePlugin('event-espresso-core/espresso.php');
	await activatePlugin('barista/ee-barista.php');	

	await Goto.eventsListPage();
	await defaultSettingsManager.gotoDefaultSettings();
	await defaultSettingsManager.selectDefaultEditor('1');
});

afterAll(async () => {
	await deactivatePlugin('barista/ee-barista.php');
});
