import { saveVideo } from 'playwright-video';

import { createNewEvent, EntityListParser, TAMRover, GetMapProps, ListView } from '@e2eUtils/admin/event-editor';
import { clickLabel } from '@e2eUtils/common';
import { EntityType } from '../../types';

import { addDatesAndTickets } from './utils';

const tamrover = new TAMRover();
const parser = new EntityListParser('datetime', 'card');

beforeAll(async () => {
	await saveVideo(page, 'artifacts/tam-related-count-vs-assignments.mp4');

	await createNewEvent({ title: 'TAM: Related Count in card and table view vs TAM Assignments' });

	await addDatesAndTickets();
});

const toggleAllFilters = async () => {
	await clickLabel('show trashed dates');
	await clickLabel('show expired tickets');
	await clickLabel('show trashed tickets');
};

const assertListAndTAMRelatedCount = async (entityType: EntityType, viewType: ListView, closeModal = true) => {
	// Set entity and switch to th view type before getting the ids
	await parser.setEntityType(entityType).switchView(viewType);

	// create a map of db id and related item count
	const relatedCountInList = await parser.getRelatedItemsCountMap();

	// Open TAM for all dates/tickets
	await tamrover.setForType('all').launch();

	// Toggle filters
	await toggleAllFilters();

	const tamMapOptions: GetMapProps = {
		forceGenerate: true,
		mapFromTo: entityType === 'ticket' ? 'ticket2dates' : 'date2tickets',
	};

	const relatedCountInTAM = await tamrover.getAssigmentsCountMap(tamMapOptions);

	for (const dbId in relatedCountInList) {
		const countInList = relatedCountInList[dbId];
		const countInTAM = relatedCountInTAM[dbId];

		expect(countInList).toEqual(countInTAM);
	}

	// Toggle filters
	await toggleAllFilters();

	if (closeModal) {
		// Close TAM modal
		await tamrover.close();
	}
};

describe('TAM:RelatedCountVsAssignments', () => {
	// check for both dates and tickets
	for (const entityType of ['datetime', 'ticket'] as const) {
		// check for both the views
		for (const viewType of ['card', 'table'] as const) {
			// eslint-disable-next-line jest/expect-expect
			it(`tests related items count for ${entityType}s in ${viewType} view vs assignments count in TAM`, async () => {
				/******** CHECK BEFORE SUBMIT ********/
				await assertListAndTAMRelatedCount(entityType, viewType, false);

				// Lets flip all the relations
				await tamrover.toggleAllAssignments();

				// Now lets submit.
				await tamrover.submit();

				/******** CHECK AFTER SUBMIT ********/
				await assertListAndTAMRelatedCount(entityType, viewType);

				// Reload the page.
				await page.reload();

				await page.waitForSelector('[type=button] >> text=Ticket Assignments');

				/******** CHECK AFTER RELOAD ********/
				await assertListAndTAMRelatedCount(entityType, viewType);
			});
		}
	}
});
