import { createNewEvent, EntityListParser } from '@e2eUtils/admin/events';

const namespace = 'event-editor-switch-list-view';
const parser = new EntityListParser();

beforeAll(async () => {
	await createNewEvent({ title: namespace });
});

describe(namespace, () => {
	for (const entityType of ['ticket', 'datetime'] as const) {
		it(`tests the list view change for ${entityType}s list`, async () => {
			let view = await parser.setEntityType(entityType).getCurrentView();
			// card view is the default view
			expect(view).toBe('card');

			// try to switch to the same view
			await parser.switchView('card');
			view = await parser.getCurrentView();
			// view should not have changed
			expect(view).toBe('card');

			// Now lets switch to table view
			await parser.switchView('table');
			view = await parser.getCurrentView();
			expect(view).toBe('table');

			// Now lets switch back to card view
			await parser.switchView('card');
			view = await parser.getCurrentView();
			expect(view).toBe('card');

			// Restore default view
			parser.reset();
		});
	}
});
