import { saveVideo } from 'playwright-video';

import { addNewDate, createNewEvent, DateEditor, EDTRGlider, TicketEditor } from '@e2eUtils/admin/event-editor';
import { EventRegistrar } from '@e2eUtils/public/reg-checkout';

const namespace = 'eventDates.filters.sales';

const dateEditor = new DateEditor();
const ticketEditor = new TicketEditor();
const registrar = new EventRegistrar();
const edtrGlider = new EDTRGlider();

beforeAll(async () => {
	await saveVideo(page, `artifacts/${namespace}.mp4`);

	await createNewEvent({ title: namespace });

	// Rename the default date
	await dateEditor.updateNameInline(null, 'Date1');
	// Rename the default ticket
	await ticketEditor.updateNameInline(null, 'Ticket1');

	/**
	 * Lets have 4 dates with varying capacity
	 *
	 * We will register for 10 tickets
	 */
	// 10 out of 11 will mean "above 90%"
	await dateEditor.updateCapacityInline(null, '11');
	// 10 out of 13 will mean "above 75%"
	await addNewDate({ name: 'Date2', capacity: '13' });
	// 10 out of 18 will mean "above 50%"
	await addNewDate({ name: 'Date3', capacity: '18' });
	// 10 out of 25 will mean "below 50%"
	await addNewDate({ name: 'Date4', capacity: '25' });

	registrar.setPermalink(await edtrGlider.getEventPermalink());

	await registrar.registerForEvent({
		tickets: [{ name: 'Ticket1', quantity: 10 }],
		attendeeInfo: {
			fname: 'Joe',
			lname: 'Doe',
			email: 'test@example.com',
		},
		redirectURL: await edtrGlider.getEventEditUrl(),
	});
});

describe(namespace, () => {
	it('should filter dates corresponding to sales control', async () => {
		// Without any filters, we should have 4 dates
		expect(await dateEditor.getItemCount()).toBe(4);

		await dateEditor.filterListBy('sales', { value: 'above90Capacity' });

		expect(await dateEditor.getItemCount()).toBe(1);

		await dateEditor.filterListBy('sales', { value: 'above75Capacity' });

		expect(await dateEditor.getItemCount()).toBe(2);

		await dateEditor.filterListBy('sales', { value: 'above50Capacity' });

		expect(await dateEditor.getItemCount()).toBe(3);

		await dateEditor.filterListBy('sales', { value: 'below50Capacity' });

		expect(await dateEditor.getItemCount()).toBe(1);
	});
});
