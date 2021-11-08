// import { createNewEvent } from '@e2eUtils/admin/events';
import { Goto, EventListSurfer } from '@e2eUtils/admin';

const eventListSurfer = new EventListSurfer();

describe('DummyTest', () => {
	it('Does nothing more than creating an event!', async () => {
		// await createNewEvent({ title: 'Dummy Event', description: 'some desc' });

		await Goto.eventsListPage();

		const href = await eventListSurfer.getViewLinkByText('Trash');

		await eventListSurfer.selectBulkAction({ label: 'Move to Trash' });
		await eventListSurfer.selectAll();
		await eventListSurfer.applyBulkAction();

		console.log({ href });

		expect(true).toBe(true);
	});
});
