import { saveVideo, PageVideoCapture } from 'playwright-video';

import { addNewTicket, createNewEvent, EDTRGlider, TicketEditor } from '@e2eUtils/admin/events';
import { EventRegistrar } from '@e2eUtils/public/reg-checkout';

const namespace = 'event.free-event.registration';

let capture: PageVideoCapture;

beforeAll(async () => {
	capture = await saveVideo(page, `artifacts/${namespace}.mp4`);
});

afterAll(async () => {
	await capture?.stop();
});

const ticketEditor = new TicketEditor();
const registrar = new EventRegistrar();
const edtrGlider = new EDTRGlider();

describe(namespace, () => {
	it('should show thank you message if everything went well', async () => {
		await createNewEvent({ title: 'Free event' });

		await ticketEditor.updateQuantityInline(null, 75);

		await addNewTicket({ amount: 100, name: 'Paid Ticket' });

		await registrar.setPermalink(await edtrGlider.getEventPermalink()).registerForEvent({
			tickets: [{ name: 'Free Ticket', quantity: 1 }],
			attendeeInfo: {
				fname: 'Joe',
				lname: 'Doe',
				email: 'test@example.com',
			},
		});

		const content = await page.$eval('.entry-content', (el) => el.textContent);
		expect(content).toContain('Your registration has been successfully processed.');
		expect(content).toContain('View Full Order Confirmation Receipt');
	});
});
