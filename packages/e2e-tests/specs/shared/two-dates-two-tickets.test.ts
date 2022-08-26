import { saveVideo, PageVideoCapture } from 'playwright-video';
import { addNewDate, addNewTicket, createNewEvent, editEntityCard, EDTRGlider } from '@e2eUtils/admin/events';
import { assertRegSuccess, EventRegistrar } from '@e2eUtils/public/reg-checkout';

const registrar = new EventRegistrar();
const edtrGlider = new EDTRGlider();

const namespace = 'event.entities.reigstration-2';
let capture: PageVideoCapture;

beforeAll(async () => {
	capture = await saveVideo(page, `artifacts/${namespace}.mp4`);
});

afterAll(async () => {
	await capture?.stop();
});

describe(namespace, () => {
	it('should check if registration was successful and the reg status is approved', async () => {

		const eventText = 'Two Dates Two Tickets';
		await createNewEvent({ title: eventText, description: eventText });

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
