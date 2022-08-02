import { saveVideo, PageVideoCapture } from 'playwright-video';
import { createNewEvent } from '@e2eUtils/admin/events';

const namespace = 'shared-dummy';
let capture: PageVideoCapture;

beforeAll(async () => {
	capture = await saveVideo(page, `artifacts/${namespace}.mp4`);
});

afterAll(async () => {
	await capture?.stop();
});

describe('DummyTest', () => {
	it('Does nothing more than creating an event!', async () => {
		await createNewEvent({ title: 'Dummy Event', description: 'some desc' });

		expect(true).toBe(true);
	});
});
