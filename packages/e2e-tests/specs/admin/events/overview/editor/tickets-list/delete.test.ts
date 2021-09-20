import { addNewTicket, createNewEvent, TicketEditor } from '@e2eUtils/admin/event-editor';

const namespace = 'event.tickets.delete';

const ticketEditor = new TicketEditor();

beforeEach(async () => {
	await createNewEvent({ title: namespace });
});

describe(namespace, () => {
	it('should trash tickets by name', async () => {
		await addNewTicket({ name: namespace + '.ticket' });
		let ticketCount = await ticketEditor.getItemCount();

		expect(ticketCount).toBe(2);

		await ticketEditor.trashItemBy('name', namespace + '.ticket');

		ticketCount = await ticketEditor.getItemCount();

		expect(ticketCount).toBe(1);

		const ticket = await ticketEditor.getItem();

		await ticketEditor.trashItem(ticket);

		ticketCount = await ticketEditor.getItemCount();
		expect(ticketCount).toBe(0);
	});

	it('tests the permanent deletion of tickets', async () => {
		let itemCount = await ticketEditor.getItemCount();

		expect(itemCount).toBe(1);

		let item = await ticketEditor.getItem();
		// Lets trash the only ticket we have
		await ticketEditor.trashItem(item);

		itemCount = await ticketEditor.getItemCount();
		// Now we should have nothing :(
		expect(itemCount).toBe(0);

		// Lets unhide the treasure
		await ticketEditor.removeAllFilters();

		itemCount = await ticketEditor.getItemCount();
		// we should now have the trashed one
		expect(itemCount).toBe(1);
		item = await ticketEditor.getItem();
		const status = await ticketEditor.getItemStatus(item);
		expect(status).toBe('trashed');

		// Lets open dropdown menu
		await ticketEditor.openDropdownMenu(item);
		const permanentDeleteBtn = await item.$('[type=button] >> text=delete permanently');
		// Since we only have single entity in the list, permanent delete button should be disabled
		expect(await permanentDeleteBtn.isDisabled()).toBe(true);

		// Now lets add another ticket
		await addNewTicket({ name: namespace + '.ticket' });
		// Now we should have 2 tickets
		itemCount = await ticketEditor.getItemCount();
		expect(itemCount).toBe(2);

		// Lets narrow down to only the trashed tickets
		await ticketEditor.filterListBy('status', { label: 'trashed tickets only' });

		// Now we should have only 1 ticket (trashed)
		itemCount = await ticketEditor.getItemCount();
		expect(itemCount).toBe(1);
		await ticketEditor.removeAllFilters();
		itemCount = await ticketEditor.getItemCount();
		expect(itemCount).toBe(2);

		item = await ticketEditor.getItemBy('status', 'trashed');
		// we should now be able to delete the item permanently
		await ticketEditor.permanentlyDeleteItem(item);

		itemCount = await ticketEditor.getItemCount();
		expect(itemCount).toBe(1);
	});
});
