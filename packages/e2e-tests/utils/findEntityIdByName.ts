import type { Entity } from '../types';

interface Props extends Entity {
	name: string;
	view: 'card' | 'table';
}

export const findEntityIdByName = async ({ entity, name, view }: Props) => {
	const entityList = await page.$(`#ee-entity-list-${entity}s`);

	if (view === 'table') {
		const listItemId = await entityList.$eval(`text=${name}`, (e) =>
			e.closest('.ee-entity-list-item').getAttribute('data-testid')
		);
		const [entityId] = listItemId.split(`ee-${entity}-list-view-row-`).reverse();

		return entityId;
	}

	if (view === 'card') {
		const listItemId = await entityList.$eval(
			`text=${name}`,
			(e) => e.closest('.ee-entity-list-item').querySelector('.ee-entity-dbid').innerHTML
		);
		const [entityId] = listItemId.split('ee-entity-paper-frame-').filter(Boolean);

		return entityId;
	}
};
