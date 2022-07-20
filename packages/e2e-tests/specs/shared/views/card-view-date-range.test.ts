import { saveVideo, PageVideoCapture } from 'playwright-video';
import { createNewEvent, setListDisplayControl, EntityListParser } from '@e2eUtils/admin/events';
import { selectDateFromNextMonth } from '@e2eUtils/common';

const parser = new EntityListParser();

const namespace = 'event.entities.edit.calendar.date.range';
let capture: PageVideoCapture;

beforeAll(async () => {
	capture = await saveVideo(page, `artifacts/${namespace}.mp4`);

	await createNewEvent({ title: namespace });
});

afterAll(async () => {
	await capture?.stop();
});

describe(namespace, () => {
	for (const entity of ['ticket', 'datetime'] as const) {
		it('should change the start and end date from the card for:' + entity, async () => {
			parser.setEntityType(entity);

			await page.click(`${parser.getRootSelector()} .ee-edit-calendar-date-range-btn`);

			let inputSelector = '.date-range-picker__start .react-datepicker__input-container input';

			await page.focus(inputSelector);
			const [startDate, startDateMonth] = await selectDateFromNextMonth();
			// Ensure to take focus away from datepicker input to close the popup
			await page.press(inputSelector, 'Escape');

			inputSelector = '.date-range-picker__end .react-datepicker__input-container input';
			await page.focus(inputSelector);
			const [endDate, endDateMonth] = await selectDateFromNextMonth();
			// Ensure to take focus away from datepicker input to close the popup
			await page.press(inputSelector, 'Escape');

			const waitForListUpdate = await parser.createWaitForListUpdate();
			await page.click('.ee-popover__content [aria-label="save"]');
			await waitForListUpdate();

			await setListDisplayControl(entity, 'both');

			// first/only item
			const item = await parser.getItem();
			const sidebarContent = await item?.$eval('.entity-card__sidebar', (elements) => elements.textContent);

			expect(sidebarContent).toContain(startDate);
			expect(sidebarContent).toContain(startDateMonth.substring(0, 3));

			expect(sidebarContent).toContain(endDate);
			expect(sidebarContent).toContain(endDateMonth.substring(0, 3));
		});
	}
});
