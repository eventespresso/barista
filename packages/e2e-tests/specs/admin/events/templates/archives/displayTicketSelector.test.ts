import { saveVideo, PageVideoCapture } from 'playwright-video';
import { TemplatesManager, Goto, createNewEvent } from '@e2eUtils/admin';
import { eventData } from 'packages/e2e-tests/specs/shared/data';

const templatesManager = new TemplatesManager();

const namespace = 'templates-archives-display-ticket-selector';
let capture: PageVideoCapture;

beforeAll(async () => {
	capture = await saveVideo(page, `artifacts/${namespace}.mp4`);
});

afterAll(async () => {
	await capture?.stop();
});

describe('Display ticket selector - archives test', () => {
	// set ticket selector and get ticket container at to event listing url
	const processToSetTicketSelector = async ({ value, textValue }: { value: string; textValue: string }) => {
		//  go to templates tab
		await templatesManager.gotoTemplates();
		// gett selected display ticket selector at templates archive section
		const getSelectedDisplayDescription = await templatesManager.getSelectedDisplayTicketSelector();
		// check if selected ticket selector is equal to "No" if true se to "Yes" else do nothing
		if (getSelectedDisplayDescription !== textValue) {
			// set display ticket selector to "Yes"
			await templatesManager.setAndSaveDisplayTicketSelector({ value });
		}
		// go to event listing url
		const getEventListingUrl = await templatesManager.getEventListingUrl();
		await page.goto(getEventListingUrl);

		// get ticket container at to event listing url
		return await page?.$('.tkt-slctr-tbl-wrap-dv');
	};

	it('Create new sample event', async () => {
		await Goto.eventsListPage();
		// count event from view all event link action
		const countEvent = await templatesManager.getViewCount('View All Events');
		if (!countEvent) {
			await createNewEvent(eventData.upcoming);
			await Goto.eventsListPage();
		}
		// count event from view all event link action after created one
		const countEventAfter = await templatesManager.getViewCount('View All Events');

		// assert count from view all event link
		expect(countEventAfter).toBeTruthy();
	});

	it('Set display ticket selector to "Yes"', async () => {
		// set ticket selector and get ticket container at to event listing url
		const getTicketContainer = await processToSetTicketSelector({ value: '1', textValue: 'Yes' });

		// assert if ticket container is exist after selecting display to "Yes"
		expect(getTicketContainer).toBeTruthy();
	});

	it('Set display ticket selector to "No"', async () => {
		await Goto.eventsListPage();
		// set ticket selector and get ticket container at to event listing url
		const getTicketContainer = await processToSetTicketSelector({ value: '0', textValue: 'No' });

		// assert if ticket container still exist, suppose to be null after selected "No"
		expect(getTicketContainer).toBe(null);
	});
});
