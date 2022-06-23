import { fillAttendeeInformation, AttendeeInformation } from './fillAttendeeInformation';

export type RegisterOptions = {
	tickets: Array<{ name: string; quantity: number }>;
	attendeeInfo: AttendeeInformation;
	redirectURL?: string;
};

/**
 * Helper class to handle event registrations
 */
export class EventRegistrar {
	/**
	 * Permalink of the event
	 */
	permalink = '';

	constructor(permalink?: string) {
		this.permalink = permalink;
	}

	/**
	 * Reset instance data.
	 */
	reset(): void {
		this.setPermalink('');
	}

	/**
	 * Set the event permalink
	 */
	setPermalink = (permalink: string): EventRegistrar => {
		this.permalink = permalink;

		return this;
	};

	/**
	 * Register for the event
	 */
	registerForEvent = async ({ tickets, attendeeInfo, redirectURL }: RegisterOptions) => {
		for (const { name, quantity } of tickets) {
			await this.chooseTicketQty(name, quantity);
		}

		await this.submitTicketSelector();

		await this.submitRegistration();

		if (redirectURL) {
			await Promise.all([page.waitForNavigation(), page.goto(redirectURL)]);
		}
	};

	/**
	 * Navigates to event page on the front-end
	 */
	gotoEventPage =  async () => {
		await Promise.all([page.waitForNavigation(), page.goto(this.permalink)]);
	};

	/**
	 * Selects the given quantity for a ticket.
	 */
	chooseTicketQty = async (name: string, quantity: number) => {
		await page.selectOption(`.tkt-slctr-tbl-wrap-dv .tkt-slctr-tbl tbody tr:has-text('${name}') td.tckt-slctr-tbl-td-qty select.ticket-selector-tbl-qty-slct`, {
			value: String(quantity),
		});
	};

	/**
	 * Submits ticket selection
	 */
	submitTicketSelector = async () => {
		await Promise.all([page.waitForNavigation(), page.click('input[value="Register Now"]')]);

		await page.waitForSelector('#ee-spco-attendee_information-reg-step-form');
	};

	/**
	 * Submit checkout registration form
	 */
	submitRegistration = async () => {
		await Promise.all([page.waitForNavigation(), page.click('input[value="Proceed to Finalize Registration"]')]);

		await page.waitForSelector('#espresso-thank-you-page-overview-dv');
	};
}
