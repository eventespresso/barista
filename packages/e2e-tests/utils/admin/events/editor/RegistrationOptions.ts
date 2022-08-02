export class RegistrationOptions {
	/**
	 * get "Max Registrations per Transaction" value under "Registration Options"
	 */
	getEventRegMaxTicket = async (): Promise<string> => {
		return await (await page.$('div.ee-edtr-option__max-reg span.ee-tabbable-text__inner_wrapper')).innerText(); 
	};
}
