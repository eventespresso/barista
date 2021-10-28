import { EntityListParser } from './EntityListParser';

/**
 * Get the quanitity of a ticket by name.
 * It is assumed that the list view is set to 'card'
 */
export const getTicketQuantityByName = async (name: string): Promise<string> => {
	const parser = new EntityListParser('ticket');
	const ticket = await parser.getItemBy('name', name);

	const quanitity = await ticket.$eval('.ee-entity-details .ee-tabbable-text', (el) => el.textContent);

	return quanitity?.trim();
};
