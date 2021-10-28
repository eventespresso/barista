import { expect } from '@jest/globals';
import { EntityListParser } from '@e2eUtils/admin/events';

export const expectCardToContain = async (
	{ capacity, description, endDate, endDateMonth, name, quantity, startDate, startDateMonth, type }: any // TODO replace with a proper interface
) => {
	const parser = new EntityListParser(type);

	// first/only item
	const item = await parser.getItem();

	expect(await parser.getItemName(item)).toContain(name);

	description && expect(await parser.getItemDesc(item)).toContain(description);

	const details = await item?.$eval(
		'.ee-entity-details__value .ee-tabbable-text',
		(elements) => elements.textContent
	);

	capacity && expect(details).toContain(capacity);

	quantity && expect(details).toContain(quantity);

	const sidebarContent = await item?.$eval('.entity-card__sidebar', (elements) => elements.textContent);

	expect(sidebarContent).toContain(startDate);
	expect(sidebarContent).toContain(startDateMonth.substring(0, 3));
	expect(sidebarContent).toContain(endDate);
	expect(sidebarContent).toContain(endDateMonth.substring(0, 3));
};
