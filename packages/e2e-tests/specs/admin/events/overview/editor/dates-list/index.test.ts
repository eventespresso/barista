import { saveVideo } from 'playwright-video';

import { addNewDate, createNewEvent, EntityListParser } from '@e2eUtils/admin/event-editor';

const parser = new EntityListParser('datetime');

describe('eventDates', () => {
	it('should add new date', async () => {
		const capture = await saveVideo(page, 'artifacts/new-date.mp4');

		await createNewEvent({ title: 'to be deleted' });

		const newDateName = 'brand new date';

		await addNewDate({ name: newDateName });

		const newDate = await parser.getItemBy('name', newDateName);

		expect(await newDate.innerText()).toContain(newDateName);

		await capture.stop();
		await browser.close();
	});
});
