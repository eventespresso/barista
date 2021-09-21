import { data } from '../shared/data';
import { addNewDate, addNewTicket } from '@e2eUtils/admin/event-editor';

const datesListSelector = '#ee-entity-list-datetimes .ee-entity-list__card-view';

export const addDatesAndTickets = async () => {
	// Wait for the list lazy load
	await page.waitForFunction((selector) => document.querySelector(selector), datesListSelector);

	// add dates
	for (const item of data) {
		await addNewDate({ ...item, name: 'Date ' + item.name });
	}

	// add tickets
	for (const item of data) {
		await addNewTicket({ ...item, name: 'Ticket ' + item.name });
	}
};
