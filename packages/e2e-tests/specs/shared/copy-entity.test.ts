import { saveVideo, PageVideoCapture } from 'playwright-video';
import { Goto, DefaultSettingsManager } from '@e2eUtils/admin';
import { createNewEvent, DateEditor, TicketEditor } from '@e2eUtils/admin/events';
import { activatePlugin, deactivatePlugin } from '@e2eUtils/admin/wp-plugins-page';

const baristaPlugin = 'barista/ee-barista.php';

const dateEditor = new DateEditor();
const ticketEditor = new TicketEditor();
const defaultSettingsManager = new DefaultSettingsManager();

const namespace = 'event-editor-copy-entity';
let capture: PageVideoCapture;

beforeAll(async () => {
	capture = await saveVideo(page, `artifacts/${namespace}.mp4`);
	await activatePlugin(baristaPlugin);
	
	await Goto.eventsListPage();
	//go to default settings tab
	await defaultSettingsManager.gotoDefaultSettings();
	await defaultSettingsManager.selectDefaultEditor('1');

	await createNewEvent({ title: namespace });
	const item = await dateEditor.getItem();
	await dateEditor.updateNameInline(item, 'some date');
});

afterAll(async () => {
	await deactivatePlugin(baristaPlugin);
	
	await capture?.stop();
});

describe(namespace, () => {
	for (const entityType of ['datetime', 'ticket'] as const) {
		for (const viewType of ['card', 'table'] as const) {
			it(`tests copy ${entityType} in ${viewType} view`, async () => {
				const editor = entityType === 'datetime' ? dateEditor : ticketEditor;

				await editor.switchView(viewType);

				const beforeCopyCount = await editor.getItemCount();

				let item = await editor.getItem();
				const itemName = await editor.getItemName(item);

				await editor.copyItem(item);

				const afterCopyCount = await editor.getItemCount();

				expect(beforeCopyCount + 1).toBe(afterCopyCount);

				// Lets delete the item by the same name
				await editor.trashItemBy('name', itemName);
				// We should still have an item by the same name
				item = await editor.getItemBy('name', itemName);
				expect(item).toBeDefined();

				// Restore default view
				editor.reset();
			});
		}
	}
});
