import { saveVideo } from 'playwright-video';

import { addNewDate, createNewEvent, DateEditor, TicketEditor } from '@e2eUtils/admin/event-editor';

const namespace = 'event.dates.delete';

const dateEditor = new DateEditor();
const ticketEditor = new TicketEditor();

beforeEach(async () => {
	await createNewEvent({ title: namespace });
});

describe(namespace, () => {
	it('should trash dates by name', async () => {
		const capture = await saveVideo(page, `artifacts/${namespace}.trash.mp4`);
		try {
			await addNewDate({ name: namespace + '.date' });
			let dateCount = await dateEditor.getItemCount();

			expect(dateCount).toBe(2);

			await dateEditor.trashItemBy('name', namespace + '.date');

			dateCount = await dateEditor.getItemCount();
			let ticketCount = await ticketEditor.getItemCount();

			expect(dateCount).toBe(1);
			expect(ticketCount).toBe(1);

			const date = await dateEditor.getItem();

			await dateEditor.trashItem(date);

			dateCount = await dateEditor.getItemCount();
			ticketCount = await ticketEditor.getItemCount();
			expect(dateCount).toBe(0);
			expect(ticketCount).toBe(0);
		} catch (error) {
			await capture.stop();
		}
	});

	it('tests the permanent deletion of dates', async () => {
		const capture = await saveVideo(page, `artifacts/${namespace}.delete.mp4`);
		try {
			let itemCount = await dateEditor.getItemCount();

			expect(itemCount).toBe(1);

			let item = await dateEditor.getItem();
			// Lets trash the only date we have
			await dateEditor.trashItem(item);

			itemCount = await dateEditor.getItemCount();
			// Now we should have nothing :(
			expect(itemCount).toBe(0);

			// Lets unhide the treasure
			await dateEditor.removeAllFilters();

			itemCount = await dateEditor.getItemCount();
			// we should now have the trashed one
			expect(itemCount).toBe(1);
			item = await dateEditor.getItem();
			const status = await dateEditor.getItemStatus(item);
			expect(status).toBe('trashed');

			// Lets open dropdown menu
			await dateEditor.openDropdownMenu(item);
			const permanentDeleteBtn = await item.$('[type=button] >> text=delete permanently');
			// Since we only have single entity in the list, permanent delete button should be disabled
			expect(await permanentDeleteBtn.isDisabled()).toBe(true);

			await ticketEditor.removeAllFilters();
			await ticketEditor.editTicket(null, { isTrashed: false });

			// Now lets add another date
			await addNewDate({ name: namespace + '.date' });
			// Now we should have 2 dates
			itemCount = await dateEditor.getItemCount();
			expect(itemCount).toBe(2);

			// Lets narrow down to only the trashed dates
			await dateEditor.filterListBy('status', { label: 'trashed dates only' });

			// Now we should have only 1 date (trashed)
			itemCount = await dateEditor.getItemCount();
			expect(itemCount).toBe(1);
			await dateEditor.removeAllFilters();
			itemCount = await dateEditor.getItemCount();
			expect(itemCount).toBe(2);

			item = await dateEditor.getItemBy('status', 'trashed');
			// we should now be able to delete the item pemanently
			await dateEditor.permanentlyDeleteItem(item);

			itemCount = await dateEditor.getItemCount();
			expect(itemCount).toBe(1);
		} catch (error) {
			await capture.stop();
		}
	});
});
