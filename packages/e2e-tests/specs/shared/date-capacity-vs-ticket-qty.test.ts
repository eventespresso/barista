import { saveVideo, PageVideoCapture } from 'playwright-video';

import {
	createNewEvent,
	removeLastTicket,
	addNewDate,
	addNewTicket,
	editEntityCard,
	TAMRover,
	getDateCapacityByName,
	getTicketQuantityByName,
	DateEditor,
	EntityListParser,
} from '@e2eUtils/admin/events';
import { clickLabel } from '@e2eUtils/common';

const newTicketName = 'New Ticket';
const newDateName = 'New Date';
const oldTicketName = 'Old Ticket';
const oldDateName = 'Old Date';
const dateEditor = new DateEditor();
const ticketsParser = new EntityListParser('ticket');
const tamrover = new TAMRover('datetime');

const namespace = 'date-capacity-vs-ticket-qty';

let capture: PageVideoCapture;

beforeAll(async () => {
	capture = await saveVideo(page, `artifacts/${namespace}.mp4`);

	await createNewEvent({ title: namespace });

	// Edit the existing date and ticket name
	await editEntityCard({ name: oldDateName, entityType: 'datetime' });
	await editEntityCard({ name: oldTicketName, entityType: 'ticket' });
	// Trash the existing ticket
	await removeLastTicket();
	// Add a new ticket, which will be assigned to the only date present
	await addNewTicket({ name: newTicketName, amount: 10 });
	// Add a new date, which will be assigned to the newly added ticket,
	// because we trashed the existing ticket
	await addNewDate({ name: newDateName });
	// Get the dbId of the existing date
	const oldDateId = await dateEditor.getDbIdByName(oldDateName);
	// Open TAM for it
	await tamrover.setDbId(oldDateId).launch();
	// Now only the non-trashed tickets will be visible,
	// Which means only the newly added ticket will be visible
	// Lets remove the relation between old date and new ticket
	await tamrover.toggleAllAssignments();

	// Submit TAM
	await tamrover.submit();

	// Now we have this kind of relationship,
	/**
	 *           Old Ticket | New ticket
	 * Old Date:     1      |     0
	 * New Date:     0      |     1
	 */

	// Lets now remove all the filters for tickets to make sure we can view all the tickets
	await ticketsParser.removeAllFilters();
});

afterAll(async () => {
	await capture?.stop();
});

describe(namespace, () => {
	it('tests the default date capacity and ticket quantity', async () => {
		const oldDateCapacity = await getDateCapacityByName(oldDateName);
		const newDateCapacity = await getDateCapacityByName(newDateName);
		// These will be infinity by default
		expect(oldDateCapacity).toBe('∞');
		expect(newDateCapacity).toBe('∞');

		const oldTicketQuantity = await getTicketQuantityByName(oldTicketName);
		const newTicketQuantity = await getTicketQuantityByName(newTicketName);
		expect(newTicketQuantity).toBe('∞');
		// Default ticket quantity is 100 by default
		expect(oldTicketQuantity).toBe('100');
	});

	it('tests the ticket quantity change when the related date capacity is changed inline', async () => {
		const oldDate = await dateEditor.getItemBy('name', oldDateName);
		// Set the old date capacity to 200
		await dateEditor.updateCapacityInline(oldDate, '200');

		const oldDateCapacity = await getDateCapacityByName(oldDateName);
		expect(oldDateCapacity).toBe('200');

		let oldTicketQuantity = await getTicketQuantityByName(oldTicketName);
		// This should not have changed, because it's already less than old date capacity
		expect(oldTicketQuantity).toBe('100');

		let waitForListUpdate = await ticketsParser.createWaitForListUpdate();
		// Set the old date capacity to 90
		await dateEditor.updateCapacityInline(oldDate, '90');
		await waitForListUpdate(); // we must wait for tickets list to update

		oldTicketQuantity = await getTicketQuantityByName(oldTicketName);
		// This should now be set to 90
		expect(oldTicketQuantity).toBe('90');

		// New ticket quantity should remain unchanged
		let newTicketQuantity = await getTicketQuantityByName(newTicketName);
		expect(newTicketQuantity).toBe('∞');

		waitForListUpdate = await ticketsParser.createWaitForListUpdate();
		const newDate = await dateEditor.getItemBy('name', newDateName);
		// Set the new date capacity to 300
		await dateEditor.updateCapacityInline(newDate, '300');
		await waitForListUpdate(); // we must wait for tickets list to update

		const newDateCapacity = await getDateCapacityByName(newDateName);
		expect(newDateCapacity).toBe('300');

		// This should now be set to 300
		newTicketQuantity = await getTicketQuantityByName(newTicketName);
		expect(newTicketQuantity).toBe('300');

		oldTicketQuantity = await getTicketQuantityByName(oldTicketName);
		// This should still be 90
		expect(oldTicketQuantity).toBe('90');
	});

	it('tests the ticket quantity change when the related date capacity is changed in edit form', async () => {
		const waitForListUpdate = await ticketsParser.createWaitForListUpdate();
		// Lets change the capacity in edit form
		await dateEditor.editDateBy('name', newDateName, { capacity: '200' });
		await waitForListUpdate(); // we must wait for tickets list to update

		const newTicketQuantity = await getTicketQuantityByName(newTicketName);
		expect(newTicketQuantity).toBe('200');
	});

	it('tests the ticket quantity change when adding a new related date with lower capacity', async () => {
		const waitForListUpdate = await ticketsParser.createWaitForListUpdate();
		// Add a new date, which will be assigned to the new ticket,
		// because we trashed the old ticket
		await addNewDate({ name: 'One more new date', capacity: '60' });
		await waitForListUpdate(); // we must wait for tickets list to update

		const newTicketQuantity = await getTicketQuantityByName(newTicketName);
		expect(newTicketQuantity).toBe('60');

		const oldTicketQuantity = await getTicketQuantityByName(oldTicketName);
		// This should still be 90
		expect(oldTicketQuantity).toBe('90');
	});

	it('tests the ticket quantity change when the related date is changed via TAM', async () => {
		const waitForListUpdate = await ticketsParser.createWaitForListUpdate();

		const newDateId = await dateEditor.getDbIdByName('One more new date');
		// Open TAM for it
		await tamrover.setDbId(newDateId).launch();
		await clickLabel('show trashed tickets');
		// By this, new date will be assigned to the old ticket
		await tamrover.toggleAllAssignments();

		// Submit TAM
		await tamrover.submit();
		await waitForListUpdate(); // we must wait for tickets list to update

		// Now the old ticket quantity should have changed from 90 to 60
		const oldTicketQuantity = await getTicketQuantityByName(oldTicketName);
		expect(oldTicketQuantity).toBe('60');
	});
});
