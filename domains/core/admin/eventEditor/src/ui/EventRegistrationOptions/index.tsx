import { __ } from '@eventespresso/i18n';
import classNames from 'classnames';
import { Grid, Heading, GridItem } from '@eventespresso/ui-components';
import { noop } from '@eventespresso/utils';
import { withFeature } from '@eventespresso/services';

import ActiveStatus from './EventDetails/ActiveStatus';
import AltRegPage from './RegistrationOptions/AltRegPage';
import DefaultRegistrationStatus from './RegistrationOptions/DefaultRegistrationStatus';
import Donations from './EventDetails/Donations';
import EventManager from './EventDetails/EventManager';
import EventPhoneNumber from './EventDetails/EventPhoneNumber';
import MaxRegistrations from './RegistrationOptions/MaxRegistrations';
import TicketSelector from './RegistrationOptions/TicketSelector';

import RegistrationOptions from './RegistrationOptions';
import EventDetails from './EventDetails';
import withData from './withData';

import type { EventRegistrationOptionsProps } from './types';

import './style.scss';

const className = classNames(
	'ee-edtr-section',
	'ee-grid--two',
	'ee-grid--size-sm',
	'ee-grid--size-md',
	'ee-grid--size-lg',
	'ee-reg-option',
);

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
	}

	const registrationOptions = {
		altRegPage,
		defaultRegStatus,
		displayTicketSelector,
		maxReg,
		onAltRegPageChange,
		onDefaultRegStatusChange,
		onTicketSelectorChange,
		onMaxRegChange,
	}

	return (
		<Grid className={className}>
			<EventDetails {...eventDetails} />
			<RegistrationOptions {...registrationOptions}	/>
		</Grid>
	)
};

export default withFeature('use_reg_options_meta_box')(withData(EventRegistrationOptions));
