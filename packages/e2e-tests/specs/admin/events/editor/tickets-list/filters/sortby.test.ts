import { saveVideo, PageVideoCapture } from 'playwright-video';
import { addNewTicket, createNewEvent, TicketEditor } from '@e2eUtils/admin/events';
import { data } from 'packages/e2e-tests/specs/shared/data';

const namespace = 'eventEditor.tickets.sortBy';

const ticketEditor = new TicketEditor();

let capture: PageVideoCapture;

beforeAll(async () => {
	capture = await saveVideo(page, `artifacts/${namespace}.mp4`);

	await createNewEvent({ title: namespace });

	await ticketEditor.updateNameInline(null, 'Ticket7');

	// Lets reverse the array to make sure the orders and names are not in order
	// i.e. Ticket6 will have order 2, Ticket5 has order 3 and so on
	// so that we can test sort by order correctly
	for (const item of data.reverse()) {
		await addNewTicket({ ...item, name: 'Ticket' + item.name });
	}
	await ticketEditor.filterListBy('status', { value: 'all' });
});

afterAll(async () => {
	await capture?.stop();
});

describe(namespace, () => {
	it('tests sorting of tickets', async () => {
		await ticketEditor.sortBy({ value: 'name' });
		expect(await ticketEditor.getItemName()).toBe('Ticket1');

		await ticketEditor.sortBy({ value: 'order' });
		expect(await ticketEditor.getItemName()).toBe('Ticket7');

		await ticketEditor.sortBy({ value: 'id' });
		expect(await ticketEditor.getItemName()).toBe('Ticket7');

		await ticketEditor.sortBy({ value: 'date' });
		expect(await ticketEditor.getItemName()).toBe('Ticket1');
	});
});
