import { saveVideo } from 'playwright-video';

import { createNewEvent } from '@e2eUtils/admin/event-editor';
import { clickButton } from '@e2eUtils/common';
import { activatePlugin, deactivatePlugin } from '@e2eUtils/admin/wp-plugins-page';
import { pressKeyWithModifier, EE_DEBUG } from '@e2eUtils/misc';

const REMPlugin = 'eea-recurring-events-manager/eea-recurring-events-manager.php';

beforeAll(async () => {
	await activatePlugin(REMPlugin);

	try {
		await page.click('text=Visit the Maintenance Page to get started');

		await page.click('text=My Database Is Backed Up, Continue');

		await page.click('text=Begin Database Update');

		await page.click('text=Next');
	} catch (error) {
		EE_DEBUG && console.log('The site is not in maintenance mode.');
	}

	await saveVideo(page, 'artifacts/REM.mp4');

	await createNewEvent({ title: 'REM-related' });
});

afterAll(async () => {
	await deactivatePlugin(REMPlugin);
});

describe('REM', () => {
	it('should generate 40 datetimes at the end of the end of the REM wizard', async () => {
		await page.click('text=Add New Date');
		await page.click('text=Add Recurring Dates');

		await page.selectOption('#r-rule-repeat-frequency', {
			label: 'Daily',
		});

		await page.click('[name="ee-r-rule-end-after"]');

		await pressKeyWithModifier('primary', 'a');

		await page.type('[name="ee-r-rule-end-after"]', '40');

		await clickButton('Next');

		await page.click('#ee-add-new-datetime');

		await page.focus('.ee-render-fields >> text=Name');

		await page.type('.ee-render-fields >> text=Name', 'New date');

		await clickButton('Next');

		await page.selectOption('#existing-entity', {
			label: 'Free Ticket',
		});

		await page.click('.ee-entity-option__input [type=button] >> text=Add');

		await clickButton('Next');

		const perPageSelector = '.rrule-generator-wrapper .ee-pagination__per-page';

		await page.waitForSelector(perPageSelector);
		await page.selectOption(perPageSelector, {
			value: '48',
		});

		const generatedDatesLength = await page.$$eval(
			'.ee-generated-datetime__list .ee-generated-datetime',
			(elements) => elements.length
		);

		expect(generatedDatesLength).toBe(40);

		await page.click('button[type=submit]');
	});
});
