import { getEEDomData } from '@eventespresso/services';
import { __ } from '@eventespresso/i18n';

const VISIBILITY_OPTIONS = getEEDomData('eventEditor').ticketMeta.visibilityOptions;

let VISIBILITY_OPTIONS_INFO = __('Where the ticket can be viewed throughout the UI. ');

VISIBILITY_OPTIONS.filter(option => typeof option.desc !== undefined && option.desc !== '')
	.forEach(option => {
		console.log(option);
		VISIBILITY_OPTIONS_INFO += '\n\n' + option.label + '\n • ' + option.desc;
	})

export {
	VISIBILITY_OPTIONS,
	VISIBILITY_OPTIONS_INFO
};
