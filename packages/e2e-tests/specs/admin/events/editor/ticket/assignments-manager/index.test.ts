import { saveVideo, PageVideoCapture } from 'playwright-video';
import { createNewEvent, removeLastTicket } from '@e2eUtils/admin/events';
import { clickButton } from '@e2eUtils/common';
import { isSubmitBtnDisabled } from '../../../../../../assertions';

const namespace = 'TAM';
let capture: PageVideoCapture;

beforeAll(async () => {
	capture = await saveVideo(page, `artifacts/${namespace}.mp4`);

	await createNewEvent({ title: 'TAM-related' });
});

afterAll(async () => {
	await capture?.stop();
});

describe('TAM', () => {
	it('if there are no assignments - there should be a related info and a disabled submit button', async () => {
		await page.click('text=Ticket Assignments');
		await page.click('[aria-label="OLD"]');

		await expect(page).toHaveText(
			'.ee-banner--info',
			'Tickets must always have at least one date assigned to them but one or more of the tickets below does not have any.'
		);

		expect(await isSubmitBtnDisabled()).toBe(true);

		await page.click('[aria-label="REMOVED"]');

		await page.click('[aria-label="close modal"]');

		await clickButton('confirm');
	});

	it('if there is an assignment - the submit button should be enabled', async () => {
		await page.click('text=Ticket Assignments');
		await page.click('[aria-label="OLD"]');

		expect(await isSubmitBtnDisabled()).toBe(true);

		await page.click('[aria-label="REMOVED"]');

		expect(await isSubmitBtnDisabled()).toBe(false);

		await page.click('[aria-label="close modal"]');

		await clickButton('confirm');
	});

	describe('if there are no tickets', () => {
		it('the assignments list should contain only the remaining date', async () => {
			await removeLastTicket();

			await page.click('text=Ticket Assignments');

			const assignments = await page.$$('.ee-ticket-assignments-manager tbody tr td');

			expect(assignments?.length).toBe(1);
		});
	});
});
