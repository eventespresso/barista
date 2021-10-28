import { saveVideo } from 'playwright-video';

import { addNewDate, createNewEvent, DateEditor, EDTRGlider } from '@e2eUtils/admin/events';
import { EventRegistrar } from '@e2eUtils/public/reg-checkout';
import { data } from '../../../../../../shared/data';

const namespace = 'eventDates.filters.status';

beforeAll(async () => {
	await saveVideo(page, `artifacts/${namespace}.mp4`);

	await createNewEvent({ title: namespace });

	for (const item of data) {
		await addNewDate({ ...item, name: 'Date' + item.name });
	}
});

const dateEditor = new DateEditor();
const registrar = new EventRegistrar();
const edtrGlider = new EDTRGlider();

describe(namespace, () => {
	it('should filter dates corresponding to status control', async () => {
		// By default, the status filter should be "all active and upcoming"
		// We added 2 upcoming and 1 active dates, the default date is also upcoming, making it 4
		expect(await dateEditor.getItemCount()).toBe(4);

		await dateEditor.filterListBy('status', { value: 'activeOnly' });
		// We have only 1 active date
		expect(await dateEditor.getItemCount()).toBe(1);
		expect(await dateEditor.getItemStatus()).toBe('active');

		await dateEditor.filterListBy('status', { value: 'upcomingOnly' });
		// We have 3 upcoming dates - 2 added, 1 default
		expect(await dateEditor.getItemCount()).toBe(3);
		expect(await dateEditor.getItemStatus()).toBe('upcoming');

		await dateEditor.filterListBy('status', { value: 'nextActiveUpcomingOnly' });
		// It should show only one
		expect(await dateEditor.getItemCount()).toBe(1);
		expect(await dateEditor.getItemStatus()).toBe('upcoming');

		await dateEditor.filterListBy('status', { value: 'recentlyExpiredOnly' });
		expect(await dateEditor.getItemCount()).toBe(1);
		expect(await dateEditor.getItemStatus()).toBe('expired');

		await dateEditor.filterListBy('status', { value: 'expiredOnly' });
		expect(await dateEditor.getItemCount()).toBe(2);
		expect(await dateEditor.getItemStatus()).toBe('expired');

		await dateEditor.filterListBy('status', { value: 'trashedOnly' });
		expect(await dateEditor.getItemCount()).toBe(1);
		expect(await dateEditor.getItemStatus()).toBe('trashed');

		// There should be no sold out date
		await dateEditor.filterListBy('status', { value: 'soldOutOnly' });
		expect(await dateEditor.getItemCount()).toBe(0);

		await dateEditor.filterListBy('status', { value: 'all' });
		// We have total 7 dates, but pagination will show 6
		expect(await dateEditor.getItemCount()).toBe(6);

		// Lets update the capacity of "Date5"
		await dateEditor.updateCapacityInline(await dateEditor.getItemBy('name', 'Date5'), 3);

		// Lets register for 3 tickets to make the date sold out
		registrar.setPermalink(await edtrGlider.getEventPermalink());
		await registrar.registerForEvent({
			tickets: [{ name: 'Free Ticket', quantity: 3 }],
			attendeeInfo: {
				fname: 'Joe',
				lname: 'Doe',
				email: 'test@example.com',
			},
			redirectURL: await edtrGlider.getEventEditUrl(),
		});

		//Now there should be 1 sold out date
		await dateEditor.filterListBy('status', { value: 'soldOutOnly' });
		expect(await dateEditor.getItemCount()).toBe(1);
		expect(await dateEditor.getItemStatus()).toBe('sold out');
	});
});
