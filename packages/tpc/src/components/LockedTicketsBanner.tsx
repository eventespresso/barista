import { __ } from '@eventespresso/i18n';
import { Banner } from '@eventespresso/ui-components';

import { useDataState } from '../data';
import { SOLD_TICKET_ERROR_MESSAGE } from '../utils';

const LockedTicketsBanner = () => {
	const { isDisabled } = useDataState();

	return (
		isDisabled && (
			<Banner status='info' title={__('Price editing is disabled!')} message={SOLD_TICKET_ERROR_MESSAGE} />
		)
	);
};

export default LockedTicketsBanner;
