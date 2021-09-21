import { saveVideo } from 'playwright-video';
import { path } from 'ramda';

import { createNewEvent, TAMRover } from '@e2eUtils/admin/event-editor';
import { addDatesAndTickets } from './utils';

const tamrover = new TAMRover();

beforeAll(async () => {
	await saveVideo(page, 'artifacts/tam-toggle-assignments.mp4');

	await createNewEvent({ title: 'TAM: Toggle Assignments' });

	await addDatesAndTickets();
});

afterAll(async () => {
	// Close TAM modal
	await tamrover.close();
});

describe('TAM:ToggleAssignments', () => {
	it('tests the relationship toggle between dates and tickets', async () => {
		// Open TAM for all dates/tickets
		await tamrover.setForType('all').launch();
		const existingMap = await tamrover.getMap();

		const dateIds = await tamrover.getDateIds();
		const ticketIds = await tamrover.getTicketIds();

		// Lets flip all the relations
		await tamrover.toggleAllAssignments();

		// Now in the new map, relations should have changed.
		const newMap = await tamrover.getMap({ forceGenerate: true });

		/******** CHECK RELATIONS BEFORE SUBMIT ********/
		for (const dateId of dateIds) {
			for (const ticketId of ticketIds) {
				const oldRelation = path([dateId, ticketId], existingMap);
				const newRelation = path([dateId, ticketId], newMap);
				// "OLD" relation becomes "REMOVED" and no relation becomes "NEW"
				const expectedRelation = oldRelation === 'OLD' ? 'REMOVED' : 'NEW';

				expect(newRelation).toBe(expectedRelation);
			}
		}

		// Now lets submit.
		await tamrover.submit();

		// Open TAM again
		await tamrover.setForType('all').launch();

		const afterSubmitMap = await tamrover.getMap();

		/******** CHECK RELATIONS AFTER SUBMIT ********/
		for (const dateId of dateIds) {
			for (const ticketId of ticketIds) {
				const relationB4Submit = path([dateId, ticketId], newMap);
				const relationAfterSubmit = path([dateId, ticketId], afterSubmitMap);
				// "NEW" relation becomes "OLD" and "REMOVED" becomes null
				const expectedRelation = relationB4Submit === 'NEW' ? 'OLD' : null;

				expect(relationAfterSubmit).toBe(expectedRelation);
			}
		}

		// Close TAM modal
		await tamrover.close();

		// Reload the page.
		await page.reload();

		await page.waitForSelector('[type=button] >> text=Ticket Assignments');
		// Open TAM again
		await tamrover.setForType('all').launch();

		const afterReloadMap = await tamrover.getMap();

		/******** CHECK RELATIONS AFTER RELOAD ********/
		expect(afterSubmitMap).toEqual(afterReloadMap);
	});
});
