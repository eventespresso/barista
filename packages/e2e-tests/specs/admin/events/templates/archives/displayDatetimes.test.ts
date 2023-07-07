import { saveVideo, PageVideoCapture } from 'playwright-video';
import { Goto, TemplatesManager, EventsListSurfer, createNewEvent } from '@e2eUtils/admin';
import { eventData } from '@eventespresso/e2e-tests/specs/shared/data';
import { DO_NOT_USE_BARISTA_STRUCTURE } from '@e2eUtils/dev/config';

const templatesManager = new TemplatesManager();
const eventsListSurfer = new EventsListSurfer();

const namespace = 'templates-archive-display-datetimes';

let capture: PageVideoCapture;

beforeAll(async () => {
	capture = await saveVideo(page, `artifacts/${namespace}.mp4`);

	// Remove all event from link actions (View all events, Draft, Trash)
	await Goto.eventsListPage();
});

afterAll(async () => {
	await capture?.stop();
});

describe('Display datetimes - archive test', () => {
	// this function is to set display datetimes and return the selected value for confirmation
	const setDisplayDatetimes = async ({
		value,
	}: {
		value: string;
	}): Promise<{
		getSelectedValue: string;
	}> => {
		await templatesManager.gotoTemplates();
		await templatesManager.setAndSaveDisplayDatetimes({ value });
		const getSelectedValue = await templatesManager.getSelectedDisplayDatetimes();
		return { getSelectedValue };
	};

	it('Create new sample event', async () => {
		// count event from view all event link action
		const countEvent = await eventsListSurfer.getViewCount('View All Events');
		if (!countEvent) {
			await createNewEvent(eventData.upcoming);
			await Goto.eventsListPage();
		}
		// count event from view all event link action after created one
		const countEventAfter = await eventsListSurfer.getViewCount('View All Events');
		// assert count from view all event link
		expect(countEventAfter).toBeTruthy();
	});

	it('Set display datetimes to "Yes"', async () => {
		const { getSelectedValue } = await setDisplayDatetimes({ value: '1' });
		await templatesManager.gotoEventListing();
		// get date time header text if exist
		let datetimesSelector = '';
		if (DO_NOT_USE_BARISTA_STRUCTURE) {
			datetimesSelector = '.event-datetimes > div > ul';
		} else {
			datetimesSelector = '.event-datetimes > ul';
		}
		const getDatetimesHeaderText = await (await page?.$(datetimesSelector)).innerText();

		// assert date time header text after selecting display "Yes"
		expect(getDatetimesHeaderText).toBeTruthy();
		// assert selected value
		expect(getSelectedValue).toBe('Yes');
	});

	it('Set display datetimes to "No"', async () => {
		await Goto.eventsListPage();
		const { getSelectedValue } = await setDisplayDatetimes({ value: '0' });
		await templatesManager.gotoEventListing();
		// get date time container element if exist
		const getDatetimesContainerElement = await page?.$('.event-datetimes');

		// assert container element for date time header, suppose to be null after selecting display "No"
		expect(getDatetimesContainerElement).toBe(null);
		// assert selected value
		expect(getSelectedValue).toBe('No');
	});
});
