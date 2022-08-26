import { DO_NOT_USE_BARISTA_STRUCTURE } from '../../../../utils/dev/config';

export class RegistrationOptions {
	/**
	 * get "Max Registrations per Transaction" value under "Registration Options"
	 */
	getEventRegMaxTicket = async (): Promise<string> => {
		if(DO_NOT_USE_BARISTA_STRUCTURE){
			return await (await page.$('#max-registrants')).getAttribute('value');
		}else{
			return await (await page.$('div.ee-edtr-option__max-reg span.ee-tabbable-text__inner_wrapper')).innerText(); 
		}
	};
}
