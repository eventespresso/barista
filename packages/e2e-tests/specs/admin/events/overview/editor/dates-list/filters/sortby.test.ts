import { addNewDate, createNewEvent, DateEditor } from '@e2eUtils/admin/events';
import { data } from '../../../../../../shared/data';

const namespace = 'eventEditor.dates.sortBy';

const dateEditor = new DateEditor();

beforeAll(async () => {
	await createNewEvent({ title: namespace });

	await dateEditor.updateNameInline(null, 'Date7');

	// Lets reverse the array to make sure the orders and names are not in order
	// i.e. Date6 will have order 2, Date5 has order 3 and so on
	// so that we can test sort by order correctly
	for (const item of data.reverse()) {
		await addNewDate({ ...item, name: 'Date' + item.name, singleDate: true });
	}
	await dateEditor.filterListBy('status', { value: 'all' });
});

describe(namespace, () => {
	it('tests sorting of dates', async () => {
		await dateEditor.sortBy({ value: 'name' });
		expect(await dateEditor.getItemName()).toBe('Date1');

		await dateEditor.sortBy({ value: 'order' });
		expect(await dateEditor.getItemName()).toBe('Date7');

		await dateEditor.sortBy({ value: 'id' });
		expect(await dateEditor.getItemName()).toBe('Date7');

		await dateEditor.sortBy({ value: 'date' });
		expect(await dateEditor.getItemName()).toBe('Date1');
	});
});
