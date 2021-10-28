import { addNewDate, addNewTicket, createNewEvent, DateEditor, TicketEditor } from '@e2eUtils/admin/events';
import { entities } from '../../constants';

const namespace = 'eventEditor.filters.search';

const dateEditor = new DateEditor();
const ticketEditor = new TicketEditor();

beforeAll(async () => {
	await createNewEvent({ title: namespace });

	await addNewDate({ name: 'any date' });
	await addNewTicket({ name: 'any ticket' });

	// Lets sort the list by order to make sure that indices don't change for `getNthItem`
	// because of sorting by name
	await dateEditor.sortBy('order');
	await ticketEditor.sortBy('order');
});

describe(namespace, () => {
	for (const entity of entities) {
		const editor = entity === 'datetime' ? dateEditor : ticketEditor;

		beforeEach(async () => {
			// clear search
			await editor.filterListBy('search', '');
		});

		it(`should filter ${entity} list based on basic search query`, async () => {
			const firstItem = await editor.getNthItem(1);
			const secondItem = await editor.getNthItem(2);

			expect(await editor.getItemCount()).toBe(2);

			await editor.updateNameInline(firstItem, 'abc');
			await editor.updateNameInline(secondItem, 'def');

			await editor.filterListBy('search', 'abc');
			expect(await editor.getItemCount()).toBe(1);
			expect(await editor.getItemName()).toBe('abc');

			await editor.filterListBy('search', 'def');
			expect(await editor.getItemCount()).toBe(1);
			expect(await editor.getItemName()).toBe('def');

			await editor.filterListBy('search', 'cdef');
			expect(await editor.getItemCount()).toBe(0);
		});

		it(`should filter ${entity} list based on case insensitive search query`, async () => {
			const firstItem = await editor.getNthItem(1);
			const secondItem = await editor.getNthItem(2);

			await editor.updateNameInline(firstItem, 'ABC');
			await editor.updateNameInline(secondItem, 'DEF');

			await editor.filterListBy('search', 'abc');
			expect(await editor.getItemCount()).toBe(1);
			expect(await editor.getItemName()).toBe('ABC');

			await editor.filterListBy('search', 'def');
			expect(await editor.getItemCount()).toBe(1);
			expect(await editor.getItemName()).toBe('DEF');
		});

		it(`should filter ${entity} list based on partial search query`, async () => {
			const firstItem = await editor.getNthItem(1);
			const secondItem = await editor.getNthItem(2);

			await editor.updateNameInline(firstItem, 'ABCpqr');
			await editor.updateNameInline(secondItem, 'PQR');

			await editor.filterListBy('search', 'Cpqr');

			expect(await editor.getItemCount()).toBe(1);
			expect(await editor.getItemName()).toBe('ABCpqr');

			await editor.filterListBy('search', 'pQr');
			// We should have 2 items because pqr in both
			expect(await editor.getItemCount()).toBe(2);

			// Trailing spaces should not matter
			await editor.filterListBy('search', '  pQr  ');
			expect(await editor.getItemCount()).toBe(2);
		});

		it(`should filter ${entity} list based on non English search query`, async () => {
			await editor.filterListBy('search', 'بھائ صاحب');
			expect(await editor.getItemCount()).toBe(0);

			// clear search
			await editor.filterListBy('search', '');

			const firstItem = await editor.getNthItem(1);
			const secondItem = await editor.getNthItem(2);

			await editor.updateNameInline(firstItem, 'بھائ صاحب');
			await editor.updateNameInline(secondItem, 'بھائ');

			await editor.filterListBy('search', 'بھائ صاحب');
			expect(await editor.getItemCount()).toBe(1);

			await editor.filterListBy('search', 'بھائ');
			expect(await editor.getItemCount()).toBe(2);

			await editor.filterListBy('search', 'def');
			expect(await editor.getItemCount()).toBe(0);
		});

		it(`should filter ${entity} list by serarching name and description`, async () => {
			const firstItem = await editor.getNthItem(1);
			const secondItem = await editor.getNthItem(2);

			await editor.updateNameInline(firstItem, 'abc DeF');
			await editor.updateDescInline(firstItem, 'kjguy vb nhg xyz kjhiue');

			await editor.updateNameInline(secondItem, 'xyZ 1234');
			await editor.updateDescInline(secondItem, 'i hniuyef knjkb');

			// "xyz" is in both, in desc for first and in name for second
			await editor.filterListBy('search', 'xyz');
			expect(await editor.getItemCount()).toBe(2);
			await editor.filterListBy('search', 'ef');
			expect(await editor.getItemCount()).toBe(2);

			await editor.filterListBy('search', 'vb');
			expect(await editor.getItemCount()).toBe(1);
		});
	}
});
