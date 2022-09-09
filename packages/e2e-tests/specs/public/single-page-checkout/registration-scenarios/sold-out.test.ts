import { saveVideo, PageVideoCapture } from 'playwright-video';
import { EventsListSurfer, createNewEvent, DateEditor, EDTRGlider } from '@e2eUtils/admin/events';
import { EventRegistrar, RegisterOptions } from '@e2eUtils/public/reg-checkout';
import { DefaultSettingsManager } from '@e2eUtils/admin';
import { defaultSettingsData } from '../../../shared/data';

const eventsListSurfer = new EventsListSurfer();
const registrar = new EventRegistrar();
const edtrGlider = new EDTRGlider();
const dateEditor = new DateEditor();
const defaultSettingsManager = new DefaultSettingsManager();

const namespace = 'event.free.event.registration.sold.out';
let capture: PageVideoCapture;

beforeAll(async () => {
	capture = await saveVideo(page, `artifacts/${namespace}.mp4`);
	
	const afterSelectStatus = await defaultSettingsManager.processToSelectRegStatus(
		defaultSettingsData.defaultRegStatusOptions.RAP.value
	);
	// assert before and after selecting new registration status
	expect(afterSelectStatus).toBe(defaultSettingsData.defaultRegStatusOptions.RAP.value);

	await eventsListSurfer.deleteAllEventsByLink('View All Events');

	await createNewEvent({ title: 'Free event', description: 'Free event description' });
});

afterAll(async () => {
	await capture?.stop();
});

describe(namespace, () => {
	it('should show show sold out label on date when the number of registration is the same as capacity', async () => {
		const dateName = 'upcoming datetime';

		await dateEditor.updateNameInline(null, dateName);
		await dateEditor.updateCapacityInline(null, 2);

		registrar.setPermalink(await edtrGlider.getEventPermalink());
		await registrar.gotoEventPage();

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

		await registrar.gotoEventPage();

		await registrar.registerForEvent(registrationOptions);

		expect(await dateEditor.getStatusByName(dateName)).toBe('sold out');
	});
});
