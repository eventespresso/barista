import { addNewDate, addNewTicket, createNewEvent, editEntityCard, EDTRGlider } from '@e2eUtils/admin/event-editor';
import { EventRegistrar } from '@e2eUtils/public/reg-checkout';

const namespace = 'event.entities.reigstration-2';

const registrar = new EventRegistrar();
const edtrGlider = new EDTRGlider();

describe(namespace, () => {
	it('should check if registration was succesful and the reg status is approved', async () => {
		try {
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

			await edtrGlider.questionsForRegistrant('Primary', { address: true });

			registrar.setPermalink(await edtrGlider.getEventPermalink());

			await registrar.registerForEvent({
				ticketName: 'Ticket 1',
				quantity: 1,
				attendeeInfo: {
					fname: 'Joe',
					lname: 'Doe',
					email: 'test@example.com',
					address: '3868  Burton Avenue',
				},
				redirectURL: await edtrGlider.getEventEditUrl(),
			});
		} catch (e) {
			console.log(e);
		}

		const title = await page.$eval('.entry-title', (el) => el.textContent);
		expect(title).toContain('Thank You');

		const content = await page.$eval('.entry-content', (el) => el.textContent);
		expect(content).toContain('Congratulations');
		expect(content).toContain('Approved');
	});
});
