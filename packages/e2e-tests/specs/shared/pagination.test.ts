import { saveVideo, PageVideoCapture } from 'playwright-video';
import { Goto, DefaultSettingsManager } from '@e2eUtils/admin';
import { addNewEntity, createNewEvent, EntityListParser } from '@e2eUtils/admin/events';
import { getPaginationSize } from '../../assertions';
import { entities } from '../../constants';
import { activatePlugin, deactivatePlugin } from '@e2eUtils/admin/wp-plugins-page';

const baristaPlugin = 'barista/ee-barista.php';

const defaultSettingsManager = new DefaultSettingsManager();

const namespace = 'event.entities.pagination';
let capture: PageVideoCapture;

beforeAll(async () => {
	capture = await saveVideo(page, `artifacts/${namespace}.mp4`);
	await activatePlugin(baristaPlugin);
	
	await Goto.eventsListPage();
	//go to default settings tab
	await defaultSettingsManager.gotoDefaultSettings();
	await defaultSettingsManager.selectDefaultEditor('1');
});

afterAll(async () => {
	await deactivatePlugin(baristaPlugin);
	
	await capture?.stop();
});

describe(namespace, () => {
	for (const entityType of entities) {
		it(
			'should check if pagination changes according to the logic related to number of entities: ' + entityType,
			async () => {
				const newName = `new ${entityType}`;
				const parser = new EntityListParser(entityType);

				await createNewEvent({ title: `${namespace}.${entityType}` });

				expect(await getPaginationSize(entityType)).toBe(0);

				for (const index of Array(7).keys()) {
					await addNewEntity({ entityType, name: `${newName} #${index + 1}` });
				}

				expect(await parser.getItemCount()).toBe(6);
				expect(await getPaginationSize(entityType)).toBe(2);

				await page.click(`#ee-entity-list-${entityType}s .ee-pagination .rc-pagination-item >> text=2`);
				expect(await parser.getItemCount()).toBe(2);

				await page.selectOption('.ee-pagination__per-page-select-wrapper select', {
					value: '2',
				});
				expect(await parser.getItemCount()).toBe(2);
			}
		);
	}
});
