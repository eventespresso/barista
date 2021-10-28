import type { TpcPriceModifier } from '@eventespresso/tpc';
import { isBasePrice } from '@eventespresso/predicates';
import { getPriceTypeLabel } from './getPriceTypeLabel';

const firstTPCRow = '.ee-ticket-price-calculator tbody tr:first-child';
const lastTPCRow = '.ee-ticket-price-calculator tbody tr:last-child';

export const setPrice = async (price: TpcPriceModifier) => {
	const parentSelector = isBasePrice(price) ? firstTPCRow : lastTPCRow;

	// we do not add a base price or change the order and price of base price
	if (!isBasePrice(price)) {
		await page.click(`${parentSelector} [aria-label="add new price modifier after this row"]`);
		// Set price order
		await page.fill(`${parentSelector} [aria-label="price order"]`, (price.order || 2).toString());

		// Set price type
		const label = getPriceTypeLabel(price);
		await page.selectOption(`${parentSelector} [aria-label="price type"]`, { label });
	}

	// Set price name
	await page.fill(`${parentSelector} [aria-label="price name"]`, price.name || '');

	// Set price description
	await page.fill(`${parentSelector} [aria-label="price description"]`, price.description || '');

	// Set price amount
	await page.fill(`${parentSelector} [aria-label="amount"]`, (price.amount || '').toString());
};
