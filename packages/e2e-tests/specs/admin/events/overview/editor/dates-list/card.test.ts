import { saveVideo } from 'playwright-video';

import { createNewEvent, DateEditor, getDateCapacityByName } from '@e2eUtils/admin/event-editor';

const namespace = 'event.dates.card.view.inline-inputs';

beforeAll(async () => {
	await saveVideo(page, `artifacts/${namespace}.mp4`);

	await createNewEvent({ title: namespace });
});

const editor = new DateEditor();

describe(namespace, () => {
	it('should check the date card inline inputs', async () => {
		const newDateName = 'new date name';
		const newDateDesc = 'new date description';
		const newDateCap = '100';

		// first/only item
		const item = await editor.getItem();

		await editor.updateNameInline(item, newDateName);
		await editor.updateDescInline(item, newDateDesc);
		await editor.updateCapacityInline(item, newDateCap);

		expect(await editor.getItemName(item)).toContain(newDateName);

		expect(await editor.getItemDesc(item)).toContain(newDateDesc);

		const capacity = await getDateCapacityByName(newDateName);

		expect(capacity).toBe(newDateCap);
	});
});
