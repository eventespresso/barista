import { EntityListParser, Item } from './EntityListParser';

/**
 * Get the price of a ticket.
 */
export const getTicketPrice = async (item: Item): Promise<string> => {
	const parser = new EntityListParser('ticket');

	const view = await parser.getCurrentView();

	const selector = view === 'card' ? '.ee-currency-input .ee-tabbable-text' : '.ee-currency-display span';

	const price = await item.$eval(selector, (el) => el.textContent);

	return price?.trim();
};
