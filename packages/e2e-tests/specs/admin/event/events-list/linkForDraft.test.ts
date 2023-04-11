import { saveVideo, PageVideoCapture } from 'playwright-video';
import { Goto, EventsListSurfer, createNewEvent, EDTRGlider } from '@e2eUtils/admin';
import { eventData } from 'packages/e2e-tests/specs/shared/data';

const eventsListSurfer = new EventsListSurfer();
const edtrGlider = new EDTRGlider();

const namespace = 'events-trash-clickable-actions-links';

let capture: PageVideoCapture;

beforeAll(async () => {
	capture = await saveVideo(page, `artifacts/${namespace}.mp4`);

	// delete all events from view all events link
	await eventsListSurfer.deleteAllEventsByLink('View All Events');
	// delete all events from draft link
	await eventsListSurfer.deleteAllEventsByLink('Draft');
	// delete permanently all events at trash link
	await eventsListSurfer.deleteAllPermanentlyFromTrash();
	await Goto.eventsListPage();
});

afterAll(async () => {
	await capture?.stop();
});

describe('Draft link test', () => {
	let countBeforeDraft: number;

	it('Count row event inside draft link before create new draft event', async () => {
		// Check first the total count in draft
		countBeforeDraft = await eventsListSurfer.goToViewAndCount('Draft');
		// assert count before create new draft event, count should be equal to 0 for starting
		expect(countBeforeDraft).toBe(0);
	});

	it('Create new draft event', async () => {
		//create a draft event
		await createNewEvent({
			...eventData.upcoming,
			shouldPublish: false,
		});
		// go back to event list page
		await Goto.eventsListPage();
		// get total count in draft
		const countAfterDraft = await eventsListSurfer.goToViewAndCount('Draft');
		//count event added
		const addedEventCount = countAfterDraft - countBeforeDraft;
		// assert count after creating new draft event, count draft should be equal to one
		expect(countAfterDraft).toBe(addedEventCount + countBeforeDraft);
	});

	it('Published the first row event inside draft link', async () => {
		// get the raft first item to edit
		const draftFirstItem = await eventsListSurfer.getFirstListItem();
		// got Edit link for the selected draft first item
		const draftEditLink = await eventsListSurfer.getItemActionLinkByText(draftFirstItem, 'Edit');
		await page.goto(draftEditLink);
		// save or publish the selected item
		await edtrGlider.saveEvent();
		// go back to event list page
		await Goto.eventsListPage();
		// count again the draft list
		const countAfterDraftEdit = await eventsListSurfer.goToViewAndCount('Draft');
		// then assert the before and after edit or publish the draft item
		expect(countAfterDraftEdit).toBe(0);
	});
});
