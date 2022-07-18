import { saveVideo, PageVideoCapture } from 'playwright-video';
import { Goto, DefaultSettingsManager } from '@e2eUtils/admin';
import { createNewEvent, EntityListParser, TAMRover } from '@e2eUtils/admin/events';
import { addDatesAndTickets } from './utils';
import { activatePlugin, deactivatePlugin } from '@e2eUtils/admin/wp-plugins-page';

const baristaPlugin = 'barista/ee-barista.php';

const tamrover = new TAMRover();
const parser = new EntityListParser();
const defaultSettingsManager = new DefaultSettingsManager();

const namespace = 'tam-for-single-vs-global-data';
let capture: PageVideoCapture;

beforeAll(async () => {
	capture = await saveVideo(page, `artifacts/${namespace}.mp4`);
	await activatePlugin(baristaPlugin);
	
	await Goto.eventsListPage();
	//go to default settings tab
	await defaultSettingsManager.gotoDefaultSettings();
	await defaultSettingsManager.selectDefaultEditor('1');

	await createNewEvent({ title: 'Test for Single Vs Global TAM data' });

	await addDatesAndTickets();
});

afterAll(async () => {
	// Close TAM modal
	await tamrover.close();

	await deactivatePlugin(baristaPlugin);
	
	await capture?.stop();
});

describe('TAM:SingleVsGlobalTAM', () => {
	for (const entityType of ['datetime', 'ticket'] as const) {
		it(`tests the relations for each ${entityType} to be the same in single and global TAM modal`, async () => {
			const mapFromTo = entityType === 'ticket' ? 'ticket2dates' : 'date2tickets';

			const entities = await parser.setEntityType(entityType).getListItems();

			for (const entity of entities) {
				const entityId = await parser.getItemDbId(entity);

				// Lets launch TAM for the single entity.
				await tamrover.setForType(entityType).setDbId(entityId).launch({ mapFromTo });
				// Current map when opened for the single entity.
				const map = await tamrover.getMap();
				const mapForTheEntity = map[entityId];

				// Close TAM modal
				await tamrover.close();

				// Now open TAM for all dates/tickets
				await tamrover.setForType('all').launch({ mapFromTo });
				const newMap = await tamrover.getMap();

				const newMapForTheEntity = newMap[entityId];

				expect(mapForTheEntity).toEqual(newMapForTheEntity);
				await tamrover.close();
			}
		});
	}
});
