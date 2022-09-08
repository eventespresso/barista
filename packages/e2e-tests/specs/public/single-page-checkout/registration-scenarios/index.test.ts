import { saveVideo, PageVideoCapture } from 'playwright-video';
import { addNewTicket, createNewEvent, EDTRGlider, TicketEditor } from '@e2eUtils/admin/events';
import { assertRegSuccess, EventRegistrar } from '@e2eUtils/public/reg-checkout';

const ticketEditor = new TicketEditor();
const registrar = new EventRegistrar();
const edtrGlider = new EDTRGlider();

const namespace = 'event.free-event.registration';
let capture: PageVideoCapture;

beforeAll(async () => {
	capture = await saveVideo(page, `artifacts/${namespace}.mp4`);
});

afterAll(async () => {
	await capture?.stop();
});

describe(namespace, () => {
	it('should show thank you message if everything went well', async () => {
		await createNewEvent({ title: 'Free event', description: 'Free event description' });

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
