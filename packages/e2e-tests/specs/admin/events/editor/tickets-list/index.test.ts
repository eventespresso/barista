import { saveVideo, PageVideoCapture } from 'playwright-video';
import { addNewTicket, createNewEvent, EntityListParser } from '@e2eUtils/admin/events';
import { Goto } from '@e2eUtils/admin';
import { getInputValue } from '@e2eUtils/common';

const namespace = 'event.tickets.index';

const parser = new EntityListParser('ticket');

let capture: PageVideoCapture;

beforeAll(async () => {
	capture = await saveVideo(page, `artifacts/${namespace}.mp4`);
});

afterAll(async () => {
	await capture?.stop();
});

describe('availableTickets', () => {
	it('should add new ticket', async () => {
		//Get the tax Amount
		await Goto.pricingPage();
		await page.type('#event-espresso_page_pricing-search-input', 'Sales Tax');
		page.click('#search-submit');
		await Promise.all([
			page.waitForNavigation(),
			page.click('.ee-responsive-table-cell__content > a >> text=Sales Tax'),
		]);
		await page.waitForSelector('input#PRC_amount');
		const taxAmount = parseInt(await getInputValue('input#PRC_amount'));

		//Add Event
		await createNewEvent({ title: 'to be deleted' });

		////Add New Ticket
		const newTicketName = 'one way ticket';
		const newTicketAmount = 1234;
		await addNewTicket({ amount: newTicketAmount, name: newTicketName });

		//Check the values of ticket.
		const item = await parser.getItemBy('name', newTicketName);
		expect(await parser.getItemName(item)).toContain(newTicketName);

		const newTicketCurrencyNode = await item.innerText();
		const newTicketAmountExpect = newTicketAmount + (newTicketAmount * taxAmount) / 100;
		expect(newTicketCurrencyNode).toContain(newTicketAmountExpect);
	});
});
