import { __ } from '@eventespresso/i18n';
import { GridCard } from '@eventespresso/ui-components';

import ActiveStatus from './ActiveStatus';
import Donations from './Donations';
import EventManager from './EventManager';
import EventPhoneNumber from './EventPhoneNumber';

import type { EventRegistrationOptionsProps } from '../types';

const EventDetails: React.FC<Partial<EventRegistrationOptionsProps>> = ({
	allowDonations,
	eventManagers,
	managerId,
	onDonationsChange,
	onManagerChange,
	onPhoneNumberChange,
	onStatusChange,
	phoneNumber,
	status,
}) => (
	<GridCard className='ee-event-details' header={__('Event Details')}>
		<ActiveStatus status={status} onStatusChange={onStatusChange} />
		<EventManager eventManagers={eventManagers} managerId={managerId} onManagerChange={onManagerChange} />
		<EventPhoneNumber phoneNumber={phoneNumber} onPhoneNumberChange={onPhoneNumberChange} />
		<Donations allowDonations={allowDonations} onDonationsChange={onDonationsChange} />
	</GridCard>
);

export default EventDetails;
