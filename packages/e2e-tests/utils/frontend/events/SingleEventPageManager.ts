import { ElementHandle } from 'playwright-core';
export class SingleEventPageManager {
	/**
	 * get banner inner text at event listing page
	 */
	getBannerInnerText = async (): Promise<string> => {
		return await (await page.$('span.ee-status')).innerText();
	};

	/**
	 * get sold label at event listing page
	 */
	getSoldLabel = async (): Promise<ElementHandle<SVGElement | HTMLElement>> => {
		return await page?.$('.tckt-slctr-tkt-details-this-ticket-sold-th span');
	};

	/**
	 * show ticket info at event listing page
	 */
	showTicketDetails = async (): Promise<void> => {
		await page.$eval('.event-tickets .tckt-slctr-tbl-tr > td', (el: any) => el.click('a.display-the-hidden'));
	};

	/**
	 * get ticket wrapper for event at event listing page
	 */
	getTicketwrapper = async (eventId: string): Promise<string> => {
		// ticket wrapper
		return `#tkt-slctr-tbl-wrap-dv-${eventId}`;
	};

	/**
	 * get ticket rows for event at event listing page
	 */
	getTicketRows = async (wrapper: string): Promise<ElementHandle<SVGElement | HTMLElement>[]> => {
		// get all ticket rows at frontend
		return await page.$$(`${wrapper} table > tbody > tr.tckt-slctr-tbl-tr`);
	};
}
