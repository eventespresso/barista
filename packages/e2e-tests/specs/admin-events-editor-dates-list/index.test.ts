import { saveVideo, PageVideoCapture } from 'playwright-video';
import { Goto } from '@e2eUtils/admin';
import { addNewDate, createNewEvent, EntityListParser } from '@e2eUtils/admin/events';

const namespace = 'event.dates.index';

const parser = new EntityListParser('datetime');

let capture: PageVideoCapture;

beforeAll(async () => {
	capture = await saveVideo(page, `artifacts/${namespace}.mp4`);

	await Goto.eventsListPage();
});

afterAll(async () => {
	await capture?.stop();
});


describe('eventDates', () => {
	it('should add new date', async () => {
		await createNewEvent({ title: 'to be deleted' });

		const newDateName = 'brand new date';

		await addNewDate({ name: newDateName });

		const newDate = await parser.getItemBy('name', newDateName);

		expect(await newDate.innerText()).toContain(newDateName);
	});
});
