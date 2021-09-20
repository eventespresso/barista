import { saveVideo } from 'playwright-video';

import { createNewEvent, DateEditor, EDTRGlider } from '@e2eUtils/admin/event-editor';
import { EventRegistrar, RegisterOptions } from '@e2eUtils/public/reg-checkout';

const namespace = 'event.free.event.registration.sold.out';

const registrar = new EventRegistrar();
const edtrGlider = new EDTRGlider();

beforeAll(async () => {
	await saveVideo(page, `artifacts/${namespace}.mp4`);
	await createNewEvent({ title: 'Free event' });
});

const dateEditor = new DateEditor();

describe(namespace, () => {
	it('should show show sold out label on date when the number of registration is the same as capacity', async () => {
		const dateName = 'upcoming datetime';

		await dateEditor.updateNameInline(null, dateName);
		await dateEditor.updateCapacityInline(null, 2);

		registrar.setPermalink(await edtrGlider.getEventPermalink());

		const registrationOptions: RegisterOptions = {
			tickets: [{ name: 'Free Ticket', quantity: 1 }],
			attendeeInfo: {
				fname: 'Joe',
				lname: 'Doe',
				email: 'test@example.com',
			},
			redirectURL: await edtrGlider.getEventEditUrl(),
		};

		await registrar.registerForEvent(registrationOptions);

		expect(await dateEditor.getItemCount()).toBe(1);

		await registrar.registerForEvent(registrationOptions);

		expect(await dateEditor.getStatusByName(dateName)).toBe('sold out');
	});
});
