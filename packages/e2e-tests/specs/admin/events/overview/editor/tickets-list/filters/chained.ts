import {
	createNewEvent,
	removeLastTicket,
	addNewDate,
	addNewTicket,
	TAMRover,
	DateEditor,
	TicketEditor,
} from '@e2eUtils/admin/event-editor';

const dateEditor = new DateEditor();
const ticketEditor = new TicketEditor();
const tamrover = new TAMRover('datetime');

const namespace = 'eventEditor.tickets.filters.chained';

beforeAll(async () => {
	await createNewEvent({ title: namespace });

	// Edit the existing date and ticket name
	await dateEditor.updateNameInline(null, 'Date1');
	await ticketEditor.updateNameInline(null, 'Ticket1');

	// Trash the existing ticket
	await removeLastTicket();
	// Add a new ticket, which will be assigned to Date1
	await addNewTicket({ name: 'Ticket2' });

	// Add a new date, which will be assigned to Ticket2,
	// because we trashed Ticket1
	await addNewDate({ name: 'Date2' });

	// Get the dbId of Date1
	const date1Id = await dateEditor.getDbIdByName('Date1');
	// Open TAM for it
	await tamrover.setDbId(date1Id).launch();
	// Now only the non-trashed tickets will be visible,
	// Which means only Ticket2 will be visible
	// Lets remove the relation between Date1 and Ticket2
	await tamrover.toggleAllAssignments();

	// Submit TAM
	await tamrover.submit();

	// Now we have this kind of relationship,
	/**
	 *         Ticket1 | Ticket2
	 * Date1:     1    |    0
	 * Date2:     0    |    1
	 */

	// Lets now remove all the filters for tickets to make sure we can view all the tickets
	await ticketEditor.removeAllFilters();
});

describe(namespace, () => {
	it('tests chained filter for tickets list', async () => {
		// Without any filters, we should have 2 tickets
		expect(await ticketEditor.getItemCount()).toBe(2);

		// Lets activate chained filter
		await ticketEditor.filterListBy('chained');

		// we should still have 2 tickets, because both the dates are visible
		expect(await ticketEditor.getItemCount()).toBe(2);

		// Lets narrow down the dates list to 1 date
		await dateEditor.filterListBy('search', 'Date1');
		expect(await dateEditor.getItemCount()).toBe(1);

		// Now we should have only 1 ticket
		expect(await ticketEditor.getItemCount()).toBe(1);
		// That ticket should be Ticket1
		expect(await ticketEditor.getItemName()).toBe('Ticket1');
	});
});
