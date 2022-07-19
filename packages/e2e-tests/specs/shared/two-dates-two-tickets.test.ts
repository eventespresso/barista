import { saveVideo, PageVideoCapture } from 'playwright-video';
import { Goto, DefaultSettingsManager } from '@e2eUtils/admin';
import { addNewDate, addNewTicket, createNewEvent, editEntityCard, EDTRGlider } from '@e2eUtils/admin/events';
import { assertRegSuccess, EventRegistrar } from '@e2eUtils/public/reg-checkout';
import { activatePlugin, deactivatePlugin } from '@e2eUtils/admin/wp-plugins-page';

const baristaPlugin = 'barista/ee-barista.php';

const registrar = new EventRegistrar();
const edtrGlider = new EDTRGlider();
const defaultSettingsManager = new DefaultSettingsManager();

const namespace = 'event.entities.reigstration-2';
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
	it('should check if registration was successful and the reg status is approved', async () => {
		await createNewEvent({ title: 'Two Dates Two Tickets' });

		await editEntityCard({
			capacity: '20',
			entityType: 'datetime',
			name: 'Date 1',
		});

		await editEntityCard({
			name: 'Ticket 1',
			entityType: 'ticket',
			quantity: '15',
		});

		await addNewTicket({ name: 'Ticket 2', quantity: '20' });
		await addNewDate({ name: 'Date 2', capacity: '20' });

		registrar.setPermalink(await edtrGlider.getEventPermalink());
		await registrar.gotoEventPage();

		await registrar.registerForEvent({
			tickets: [{ name: 'Ticket 1', quantity: 1 }],
			attendeeInfo: {
				fname: 'Joe',
				lname: 'Doe',
				email: 'test@example.com',
				address: '3868 Burton Avenue',
			},
		});

		const content = await assertRegSuccess();

		expect(content).toContain('Approved');
	});
});
