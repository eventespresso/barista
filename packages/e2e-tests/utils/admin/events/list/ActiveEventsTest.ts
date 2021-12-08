import { Goto } from '@e2eUtils/admin';
import { createNewEvent } from '@e2eUtils/admin/events';
import { EventsListSurfer } from './EventsListSurfer';

interface EventData {
	title: string;
	description: string;
	status: string;
	startDate: string;
	endDate: string;
}
export class ActiveEventsTest extends EventsListSurfer {
	/**
	 *
	 * Create new event for active now link
	 */
	createEventForActiveNow = async (event: { title: string; description: string }): Promise<number> => {
		// create new event for today and month link test
		await createNewEvent(event);
		await Goto.eventsListPage();
		// go to view all events link first to count the available event for date start update
		return await this.goToViewAndCount('View All Events');
	};

	/**
	 *
	 * Update the starting date of the new created event to todays date to make the event active now
	 */
	updateStartingDateEvent = async (startDate: string, link: string) => {
		// view all event to get the first event row
		await this.goToView('View All Events');
		// get the first event in view all event link
		const eventFirstItem = await this.getFirstListItem();
		// then go to edit link for the first selected event
		const eventEditLink = await this.getItemActionLinkByText(eventFirstItem, 'Edit');
		await page.goto(eventEditLink);
		// click the edit start and end dates button at the event dates to update the start date into todays date
		await page.click('button#popover-trigger-7');
		// focus first the start date field
		await page.focus('.date-range-picker__start-input input');
		// then fill in the start date field into todays date
		await page.fill('.date-range-picker__start-input input', startDate);
		//  click save to update the start date
		await page.click('button:has-text("save")');
		// go back to event list
		await Goto.eventsListPage();
		// count the event list inside the specific link after update the start date
		return await this.goToViewAndCount(link);
	};

	/**
	 *
	 * create new event for active today
	 */
	createActiveEvent = async (
		eventData: EventData
	): Promise<{
		createNewEvent: number;
		countAddedEvent: number;
	}> => {
		// go to view all event link and return total count events
		const countBeforeCreateNewEvent = await this.goToViewAndCount('View All Events');
		// Create new upcoming event in view all event
		const createNewEvent = await this.createEventForActiveNow(eventData);
		//count event added
		const countAddedEvent = createNewEvent - countBeforeCreateNewEvent;

		return { createNewEvent, countAddedEvent: countAddedEvent + countBeforeCreateNewEvent };
	};
}
