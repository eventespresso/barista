import { createNewEvent } from '@e2eUtils/admin/events';

describe('DummyTest', () => {
	it('Does nothing more than creating an event!', async () => {
		await createNewEvent({ title: 'Dummy Event' });

		expect(true).toBe(true);
	});
});
