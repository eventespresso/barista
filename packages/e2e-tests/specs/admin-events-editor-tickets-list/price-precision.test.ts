import { saveVideo, PageVideoCapture } from 'playwright-video';
import { Goto, DefaultSettingsManager } from '@e2eUtils/admin';
import { createNewEvent, getTicketPrice, TicketEditor, TPCSafari } from '@e2eUtils/admin/events';
import { activatePlugin, deactivatePlugin } from '@e2eUtils/admin/wp-plugins-page';

import { crazyTestCases } from './data';

const baristaPlugin = 'barista/ee-barista.php';

const namespace = 'event-tickets-price-craziness';

const editor = new TicketEditor();
const tpcSafari = new TPCSafari();
const defaultSettingsManager = new DefaultSettingsManager();

let capture: PageVideoCapture;

beforeAll(async () => {
	capture = await saveVideo(page, `artifacts/${namespace}.mp4`);
	await activatePlugin(baristaPlugin);
	
	await Goto.eventsListPage();
	//go to default settings tab
	await defaultSettingsManager.gotoDefaultSettings();
	await defaultSettingsManager.selectDefaultEditor('1');

	await createNewEvent({ title: namespace });
	// Ensure that we are in card view
	await editor.switchView('card');
});

afterAll(async () => {
	await deactivatePlugin(baristaPlugin);
	
	await capture?.stop();
});

describe(namespace, () => {
	for (const { name, inputTotal, expectedTotal } of crazyTestCases) {
		it(name, async () => {
			// first/only item
			const item = await editor.getItem();

			await editor.updatePriceInline(item, inputTotal);
			const price = await getTicketPrice(item);
			expect(Number(price)).toBe(expectedTotal);
			expect(tpcSafari.getFormattedAmount(price)).toBe(tpcSafari.getFormattedAmount(expectedTotal));
		});
	}
});
