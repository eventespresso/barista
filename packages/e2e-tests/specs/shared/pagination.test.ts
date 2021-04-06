import { addNewEntity, createNewEvent, EntityListParser } from '../../utils';
import { getPaginationSize } from '../../assertions';
import { entities } from '../../constants';

const namespace = 'event.entities.pagination';

describe(namespace, () => {
	for (const entity of entities) {
		it(
			'should check if pagination changes according to the logic related to number of entities: ' + entity,
			async () => {
				const newName = `new ${entity}`;
				const parser = new EntityListParser(entity);

				await createNewEvent({ title: `${namespace}.${entity}` });

				expect(await getPaginationSize(entity)).toBe(0);

				for (const index of Array(7).keys()) {
					await addNewEntity({ entity, name: `${newName} #${index + 1}` });
				}

				expect(await parser.getItemCount()).toBe(6);
				expect(await getPaginationSize(entity)).toBe(2);

				await page.click(`#ee-entity-list-${entity}s .ee-pagination .rc-pagination-item >> text=2`);
				expect(await parser.getItemCount()).toBe(2);

				await page.selectOption('.ee-pagination__per-page-select-wrapper select', {
					value: '2',
				});
				expect(await parser.getItemCount()).toBe(2);
			}
		);
	}
});
