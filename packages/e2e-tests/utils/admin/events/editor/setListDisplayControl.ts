import type { DisplayStartOrEndDate } from '@eventespresso/edtr-services';

type Value = `${DisplayStartOrEndDate}`;

export const setListDisplayControl = async (type: 'datetime' | 'ticket', value: Value) => {
	await page.click(`#ee-entity-list-${type}s [type=button] >> text=show filters`);

	await page.selectOption(`#ee-${(type === 'datetime' && 'date') || type}s-list-display-control`, {
		value,
	});

	await page.click(`#ee-entity-list-${type}s [type=button] >> text=hide filters`);
};
