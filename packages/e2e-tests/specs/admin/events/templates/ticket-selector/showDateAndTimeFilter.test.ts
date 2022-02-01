import { saveVideo, PageVideoCapture } from 'playwright-video';
import { addDays, addHours, subDays, subHours } from 'date-fns';
import { NOW } from '@eventespresso/constants';
import {
	Goto,
	TemplatesManager,
	EventsListSurfer,
	createNewEvent,
	createMultipleEvents,
	fillEventFields,
	EDTRGlider,
	DateFormatter,
} from '@e2eUtils/admin';
import { eventData } from '../../../../shared/data';
// import { EDTRGlider } from '../editor';

const edtrGlider = new EDTRGlider();
const templatesManager = new TemplatesManager();
const eventsListSurfer = new EventsListSurfer();

const namespace = 'templates-ticket-selector-show-date-and-time-filter';
let capture: PageVideoCapture;

beforeAll(async () => {
	// capture = await saveVideo(page, `artifacts/${namespace}.mp4`);
	// await eventsListSurfer.cleanUpEvents();
	await eventsListSurfer.deleteAllEventsByLink('View All Events');
	await Goto.eventsListPage();
});

afterAll(async () => {
	// await capture?.stop();
});

describe('Show date and time filter - ticket selector test', () => {
	it('Create new sample events for date filter', async () => {
		const events = Object.values(eventData);
		const slicedEvents: any = events.slice(0, 2);
		// console.log({ slicedEvents });

		// count event first before creating one
		const countBeforeChecking = await templatesManager.goToViewAndCount('View All Events');
		// check if there is already existing event before creating one else edit first event
		if (!countBeforeChecking) {
			// create new event
			await createNewEvent({
				...eventData.upcoming,
				shouldPublish: false,
			});
		} else {
			// get the first event
			const firstItem = await templatesManager.getFirstListItem();
			// go to view action to edit events
			const restoreLink = await templatesManager.getItemActionLinkByText(firstItem, 'Edit');
			await page.goto(restoreLink);
		}
		// await eventsListSurfer.removeEventDatesFilter();
		await eventsListSurfer.setAndSaveEventDates({ ...eventData.upcoming });

		for (const iterator of slicedEvents) {
			await eventsListSurfer.newEventDates(iterator);
		}
		// await eventsListSurfer.removeEventTicketDatesFilter();
		console.log({ slicedEvents: slicedEvents.length });

		for (const iterator of [1, 2, 3]) {
			// startDate: DateFormatter.eventDateFormat(subDays(NOW, 1)),
			// endDate: DateFormatter.eventDateFormat(addDays(NOW, 1)),

			// await eventsListSurfer.setAndSaveEventTicketDates({
			// 	...eventData.upcoming,
			// 	startDate: DateFormatter.eventDateFormat(addDays(NOW, iterator * 30)),
			// 	shouldPublish: false,
			// });
			console.log({ iterator: iterator });

			// await eventsListSurfer.clickAddNewTicket();
			await page.click('text=Add New Ticket');
			// const daw = DateFormatter.eventDateFormat(addDays(NOW, iterator * 30));
			// await page.waitForSelector('.sections-wrapper');

			// await page.focus('.sections-wrapper #endDate');
			// await page.fill(
			// 	'.sections-wrapper #endDate',
			// 	DateFormatter.eventDateFormat(addDays(NOW, iterator * 30 + 1))
			// );
			// await page.focus('.sections-wrapper .section-body #name');
			await page.click('#startDate');
			await page.fill('#startDate', DateFormatter.eventDateFormat(addDays(NOW, iterator * 30)));
			await page.click('#endDate');
			await page.fill('#endDate', DateFormatter.eventDateFormat(addDays(NOW, iterator * 30 + 1)));
			await page.fill('.sections-wrapper .section-body #name', 'Ticket title');
			// await page.focus('.sections-wrapper .public-DraftEditor-content');
			await page.fill('.sections-wrapper .public-DraftEditor-content', 'Ticket description');
			// await page.focus('.sections-wrapper #startDate');

			await page.click('text=Skip prices - assign dates');
			await page.click('#ee-ticket-assignments-manager-table-data-cell-row-0-col-1 button');
			await page.click('.ee-modal__footer button[type="submit"]');
			await page.waitForSelector('#ee-event-editor');
			// await Promise.all([page.waitForNavigation(), page.click('.ee-modal__footer button[type="submit"]')]);

			console.log({ iterator: DateFormatter.eventDateFormat(addDays(NOW, iterator * 30 + iterator)) });
			// console.log({ iterator: DateFormatter.eventDateFormat(addDays(NOW, iterator * 30)) });
			// await eventsListSurfer.newEventDates(iterator);
		}

		await eventsListSurfer.publishEventChanges(true);

		expect(1).toBeTruthy();
	});

	it('Set date & time filter threshold to "2"', async () => {
		await Goto.eventsListPage();
		await templatesManager.gotoTemplates();
		await templatesManager.setAndSaveDateAndTimeFilterThreshold({ value: '2' });
		const getSelectedValue = await templatesManager.getSelectedDateAndTimeFilterThreshold();
		console.log({ getSelectedValue });

		expect(getSelectedValue).toBe('2');
	});

	it('Set show date & time filter to "Maybe show date & time filter"', async () => {
		await templatesManager.setAndSaveShowDateAndTimeFilter({ value: 'maybe_datetime_selector' });
		const getSelectedValue = await templatesManager.getSelectedShowDateAndTimeFilter();
		console.log({ getSelectedValue });
		// go to event listing page
		await templatesManager.gotoEventListing();
		const getTextLabel = await (await page.$('text= Filter by Date')).innerText();
		console.log({ getTextLabel });
		const getFilterList = await page.$$('.checkbox-dropdown-selector ul li');
		console.log({ getFilterList: getFilterList.length });
		for (const filter of getFilterList) {
			// await filter.uncheck('input.datetime-selector-option');
			const getFilterLabel = await (await filter.$('.datetime-selector-option-text-spn')).innerText();
			console.log(getFilterLabel);
		}
		const countSelectorShow = await page.$$('#tkt-slctr-tbl-3590.tkt-slctr-tbl > tbody > tr');
		console.log({ countSelectorShow: countSelectorShow.length });

		await page.click('text= Filter by Date');
		expect(getSelectedValue).toBe('Maybe show date & time filter');
	});
});
