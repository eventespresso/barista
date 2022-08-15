import { saveVideo, PageVideoCapture } from 'playwright-video';
import { createNewEvent, TicketEditor, EDTRGlider } from '@e2eUtils/admin/events';
import { activatePlugin, deactivatePlugin } from '@e2eUtils/admin/wp-plugins-page';
import { getInputValue, itif } from '@e2eUtils/common';
import { IS_WP_MULTISITE_NETWORK } from '../../../utils/dev/config';

const plugin = 'eea-wpuser-integration/eea-wpuser-integration.php';

let capture: PageVideoCapture;

const ticketEditor = new TicketEditor();
const edtrGlider = new EDTRGlider();

beforeAll(async () => {
	capture = await saveVideo(page, 'artifacts/wp-user.mp4');
});

afterAll(async () => {
	if(!IS_WP_MULTISITE_NETWORK){
		await deactivatePlugin(plugin);
	}

	await capture?.stop();
});

describe('WP User tests', () => {
	itif(!IS_WP_MULTISITE_NETWORK)('should check the absense of "Ticket Capability Requirement" field when WP User addon is NOT active', async () => {	
		
		await createNewEvent({ title: 'WP User tests 1' });

		await ticketEditor.openEditForm();

		const selectExists = await page.$eval('select#capabilityRequired', () => true).catch(() => false)
		
		expect(selectExists).toBe(false);
	});

	itif(!IS_WP_MULTISITE_NETWORK)('should check the presense of "Ticket Capability Requirement" field when WP User addon IS active', async () => {
		await activatePlugin(plugin);

		await createNewEvent({ title: 'WP User tests 2' });

		await ticketEditor.openEditForm();

		const capabilityInput = await page.$('select#capabilityRequired');

		expect(capabilityInput).not.toBeNull();

		const capabilityInputValue = await getInputValue('select#capabilityRequired');

		expect(capabilityInputValue).toBe('none');
	});

	itif(!IS_WP_MULTISITE_NETWORK)('should check the visibility of "Custom Capability" input', async () => {
		// by default 'customCapabilityRequired' input should be hidden
		let customCapabilityInput = await page.$('input#customCapabilityRequired');
		expect(customCapabilityInput).toBeNull();

		// let us select the "Custom capability" option
		await page.selectOption('select#capabilityRequired', { label: 'Custom capability' });

		// now 'customCapabilityRequired' input should be visible
		customCapabilityInput = await page.$('input#customCapabilityRequired');
		expect(customCapabilityInput).not.toBeNull();

		// set "capabilityRequired" back to "none"
		await page.selectOption('select#capabilityRequired', { label: 'none' });
	});

	itif(!IS_WP_MULTISITE_NETWORK)('tests the persistance of the capability field(s)', async () => {
		// lets change the "Capability Required" to "Read Capabilities"
		await page.selectOption('select#capabilityRequired', { label: 'Read Capabilities' });

		// submit the form to update the ticket
		await ticketEditor.fillAndSubmitForm();

		// Update the event
		await edtrGlider.saveEvent();

		// open the same ticket form again
		await ticketEditor.openEditForm();

		let capabilityInputValue = await getInputValue('select#capabilityRequired');

		expect(capabilityInputValue).toBe('read');

		// Now lets change the "Capability Required" to "Custom capability"
		await page.selectOption('select#capabilityRequired', { label: 'Custom capability' });
		// Fill in the value for custom capability
		await page.fill('input#customCapabilityRequired', 'test');

		// submit the form to update the ticket
		await ticketEditor.fillAndSubmitForm();

		// Update the event
		await edtrGlider.saveEvent();

		// open the same ticket form again
		await ticketEditor.openEditForm();

		capabilityInputValue = await getInputValue('select#capabilityRequired');

		expect(capabilityInputValue).toBe('custom');

		const customCapabilityInputValue = await getInputValue('input#customCapabilityRequired');
		expect(customCapabilityInputValue).toBe('test');
	});
});
