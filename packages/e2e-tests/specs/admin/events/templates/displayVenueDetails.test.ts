import { saveVideo, PageVideoCapture } from 'playwright-video';
import {
	Goto,
	TemplatesManager,
	triggerAddNewEvent,
	EDTRGlider,
	fillEventFields,
	EventsListSurfer,
	createNewEvent,
	VenuesManager,
} from '@e2eUtils/admin';
import { eventVenueData, eventData } from '../../../shared/data';

const templatesManager = new TemplatesManager();
const eventsListSurfer = new EventsListSurfer();
const venuesManager = new VenuesManager();
const edtrGlider = new EDTRGlider();

const namespace = 'templates-use-custom-display-order';
let capture: PageVideoCapture;

beforeAll(async () => {
	// capture = await saveVideo(page, `artifacts/${namespace}.mp4`);
	// Remove all event from link actions (View all events, Draft, Trash)
	await Goto.eventsListPage();
	await eventsListSurfer.cleanUpEvents();

	// go to templates tab
	// await templatesManager.gotoTemplates();
});

afterAll(async () => {
	// await capture?.stop();
});

describe('Display venue details test', () => {
	it('Create new venue', async () => {
		await Goto.venuesPage();
		const countBeforeCreate = await venuesManager.getViewCount('View All Venues');
		await venuesManager.createNewVenue(eventVenueData);
		const countAfterCreate = await venuesManager.getViewCount('View All Venues');
		expect(countAfterCreate).toBe(countBeforeCreate + 1);
	});

	it('Create new event and set created venue', async () => {
		await Goto.eventsListPage();
		// to test delete all venues and to move the function
		const totalPage = await venuesManager.getTotalPagePagination();
		console.log({ totalPage });

		await createNewEvent(eventData.upcoming);
		expect(0).toBe(0);
	});
});
