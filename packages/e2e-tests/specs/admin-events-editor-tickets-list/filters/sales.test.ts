import { saveVideo, PageVideoCapture } from 'playwright-video';
import { Goto, DefaultSettingsManager } from '@e2eUtils/admin';
import { activatePlugin, deactivatePlugin } from '@e2eUtils/admin/wp-plugins-page';

import { NOW } from '@eventespresso/constants';
import { sub } from '@eventespresso/dates';
import { addNewTicket, createNewEvent, EDTRGlider, TicketEditor } from '@e2eUtils/admin/events';
import { EventRegistrar } from '@e2eUtils/public/reg-checkout';

const baristaPlugin = 'barista/ee-barista.php';

const namespace = 'eventEditor.tickets.filters.sales';

const ticketEditor = new TicketEditor();
const registrar = new EventRegistrar();
const edtrGlider = new EDTRGlider();

const defaultSettingsManager = new DefaultSettingsManager();

let capture: PageVideoCapture;

beforeAll(async () => {
	capture = await saveVideo(page, `artifacts/${namespace}.mp4`);
	await activatePlugin(baristaPlugin);
	
	await Goto.eventsListPage();
	//go to default settings tab
	await defaultSettingsManager.gotoDefaultSettings();
	await defaultSettingsManager.selectDefaultEditor('1');

	await createNewEvent({ title: namespace });

	// Rename the default ticket
	await ticketEditor.updateNameInline(null, 'Ticket1');

	/**
	 * Lets have 4 dates with varying capacity
	 *
	 * We will register for 10 tickets
	 */
	// 10 out of 11 will mean "above 90%"
	await ticketEditor.updateQuantityInline(null, '11');
	// 10 out of 13 will mean "above 75%"
	await addNewTicket({ name: 'Ticket2', quantity: '13', startDate: sub('days', NOW, 2) });
	// 10 out of 18 will mean "above 50%"
	await addNewTicket({ name: 'Ticket3', quantity: '18', startDate: sub('days', NOW, 2) });
	// 10 out of 25 will mean "below 50%"
	await addNewTicket({ name: 'Ticket4', quantity: '25', startDate: sub('days', NOW, 2) });

	// The limit by default is 10, we need to change it
	await edtrGlider.setMaxRegistrations(100);

	registrar.setPermalink(await edtrGlider.getEventPermalink());
	await registrar.gotoEventPage();

	await registrar.registerForEvent({
		tickets: [
			{ name: 'Ticket1', quantity: 10 },
			{ name: 'Ticket2', quantity: 10 },
			{ name: 'Ticket3', quantity: 10 },
			{ name: 'Ticket4', quantity: 10 },
		],
		attendeeInfo: {
			fname: 'Joe',
			lname: 'Doe',
			email: 'test@example.com',
		},
		redirectURL: await edtrGlider.getEventEditUrl(),
	});
});

afterAll(async () => {
	await deactivatePlugin(baristaPlugin);
	
	await capture?.stop();
});

describe(namespace, () => {
	it('should filter dates corresponding to sales control', async () => {
		// Without any filters, we should have 4 tickets
		expect(await ticketEditor.getItemCount()).toBe(4);

		await ticketEditor.filterListBy('sales', { value: 'above-90-sold' });

		expect(await ticketEditor.getItemCount()).toBe(1);

		await ticketEditor.filterListBy('sales', { value: 'above-75-sold' });

		expect(await ticketEditor.getItemCount()).toBe(2);

		await ticketEditor.filterListBy('sales', { value: 'above-50-sold' });

		expect(await ticketEditor.getItemCount()).toBe(3);

		await ticketEditor.filterListBy('sales', { value: 'below-50-sold' });

		expect(await ticketEditor.getItemCount()).toBe(1);
	});
});