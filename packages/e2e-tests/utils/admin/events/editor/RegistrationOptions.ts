export class RegistrationOptions {
	/**
	 * get "Max Registrations per Transaction" value under "Registration Options"
	 */
	getEventRegMaxTicket = async (): Promise<string> => {
		return await (await page.$('#max-registrants')).getAttribute('value');
	};
}
