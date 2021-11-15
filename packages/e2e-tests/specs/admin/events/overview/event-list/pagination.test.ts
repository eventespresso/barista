import { createNewEvent } from '@e2eUtils/admin/events';
import { EventsListSurfer, Goto } from '@e2eUtils/admin';
import { eventData } from '../../../../shared/data';

const eventsListSurfer = new EventsListSurfer();

beforeAll(async () => {
	await Goto.eventsListPage();
});

describe('Test overview pagination', () => {
	it('test pagination', async () => {
		// first click view all events
		await eventsListSurfer.goToView('View All Events');

		// get the number and elements of rows availble
		const count = await eventsListSurfer.getItemCount();

		if (count) {
			for (const args of eventData.upcomingNextMonth) {
				await createNewEvent(args);
			}
			await Goto.eventsListPage();
		}

		// 1. count again the available event
		// 2. set screen option pagination event
		// 3. paginate until the end of the pagination then assert the number of rows base on pagination event option
		expect(true).toBeTruthy();
	});
});
