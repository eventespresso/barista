import { saveVideo, PageVideoCapture } from 'playwright-video';
import { Goto, DefaultSettingsManager } from '@e2eUtils/admin';
import { addNewTicket, createNewEvent, EDTRGlider, TicketEditor } from '@e2eUtils/admin/events';
import { assertRegSuccess, EventRegistrar } from '@e2eUtils/public/reg-checkout';
import { activatePlugin, deactivatePlugin } from '@e2eUtils/admin/wp-plugins-page';

const baristaPlugin = 'barista/ee-barista.php';

const ticketEditor = new TicketEditor();
const registrar = new EventRegistrar();
const edtrGlider = new EDTRGlider();
const defaultSettingsManager = new DefaultSettingsManager();

const namespace = 'event.free-event.registration';
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
	it('should show thank you message if everything went well', async () => {
		await createNewEvent({ title: 'Free event' });

		await ticketEditor.updateQuantityInline(null, 75);

		await addNewTicket({ amount: 100, name: 'Paid Ticket' });

		registrar.setPermalink(await edtrGlider.getEventPermalink());
		await registrar.gotoEventPage();


		await registrar.registerForEvent({
			tickets: [{ name: 'Free Ticket', quantity: 1 }],
			attendeeInfo: {
				fname: 'Joe',
				lname: 'Doe',
				email: 'test@example.com',
			},
		});

		const content = await assertRegSuccess();
		expect(content).toContain('Approved');
	});
});
