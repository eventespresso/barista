/* eslint-disable @wordpress/i18n-no-collapsible-whitespace */
import { __ } from '@eventespresso/i18n';

import { Banner } from '@eventespresso/ui-components';
import { useDataState } from '../data';

interface ErrorMessageProps {
	asAlert?: boolean;
	dataState: ReturnType<typeof useDataState>;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ asAlert = true, dataState }) => {
	const { hasOrphanDates, hasOrphanTickets } = dataState;

	let message = '';

	if (hasOrphanTickets()) {
		message = __(
			'Tickets must always have at least one date assigned to them but one or more of the tickets below does not have any. \nPlease correct the assignments for the highlighted cells.'
		);
	} else if (hasOrphanDates()) {
		message = __(
			'Event Dates must always have at least one Ticket assigned to them but one or more of the Event Dates below does not have any. \nPlease correct the assignments for the highlighted cells.'
		);
	}

	if (!message) {
		return null;
	}

	if (asAlert) {
		return <Banner status={'info'} title={__('Please Update Assignments')} message={message} />;
	}

	return <span>{message}</span>;
};

export default ErrorMessage;
