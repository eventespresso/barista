import { saveVideo } from 'playwright-video';

import { addNewEntity, createNewEvent, EntityEditor } from '@e2eUtils/admin/event-editor';
import { entities } from '../../../constants';

const namespace = 'event.views.table.new-entities';

beforeAll(async () => {
	await saveVideo(page, `artifacts/${namespace}.mp4`);
	await createNewEvent({ title: namespace });
});

const editor = new EntityEditor();

describe(namespace, () => {
	for (const entityType of entities) {
		it('should switch the view and rename the inline entity name for ' + entityType, async () => {
			const newName = `yet another name for ${entityType}`;

			await addNewEntity({ entityType, name: `new ${entityType}` });

			await editor.setEntityType(entityType).switchView('table');

			const item = await editor.getItem();
			await editor.updateNameInline(item, newName);

			const content = await item.innerText();

			expect(content).toContain(newName);
		});
	}
});
