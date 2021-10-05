import { Grid } from '@eventespresso/ui-components';
import { noop } from '@eventespresso/utils';
import { withFeature } from '@eventespresso/services';

import RegistrationOptions from './RegistrationOptions';
import EventDetails from './EventDetails';
import withData from './withData';

import type { EventRegistrationOptionsProps } from './types';

import './style.scss';

export const EventRegistrationOptions: React.FC<Partial<EventRegistrationOptionsProps>> = ({
	allowDonations,
	altRegPage,
	defaultRegStatus,
	displayTicketSelector,
	eventManagers,
	managerId,
	maxReg,
	onAltRegPageChange = noop,
	onDefaultRegStatusChange,
	onDonationsChange,
	onManagerChange,
	onPhoneNumberChange,
	onStatusChange,
	onTicketSelectorChange,
	onMaxRegChange = noop,
	phoneNumber,
	status,
}) => {
	const eventDetails = {
		allowDonations,
		eventManagers,
		managerId,
		onDonationsChange,
		onManagerChange,
		onPhoneNumberChange,
		onStatusChange,
		phoneNumber,
		status,
	};

	const registrationOptions = {
		altRegPage,
		defaultRegStatus,
		displayTicketSelector,
		maxReg,
		onAltRegPageChange,
		onDefaultRegStatusChange,
		onTicketSelectorChange,
		onMaxRegChange,
	};

	return (
		<Grid className='ee-edtr-section ee-edtr-cards' maxColumns={2} size='big'>
			<EventDetails {...eventDetails} />
			<RegistrationOptions {...registrationOptions} />
		</Grid>
	);
};

export default withFeature('use_reg_options_meta_box')(withData(EventRegistrationOptions));
