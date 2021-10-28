import { EntityListParser } from './EntityListParser';

/**
 * Get the capacity of a date by name.
 * It is assumed that the list view is set to 'card'
 */
export const getDateCapacityByName = async (name: string): Promise<string> => {
	const parser = new EntityListParser('datetime');
	const date = await parser.getItemBy('name', name);

	const capacity = await date.$eval('.ee-entity-details .ee-tabbable-text', (el) => el.textContent);

	return capacity?.trim();
};
