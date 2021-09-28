import { __ } from '@eventespresso/i18n';
import { Grid, Heading, GridItem } from '@eventespresso/ui-components';

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
	<Grid className='ee-grid--one'>	
		<Heading as='h3' className='ee-edtr-section-heading'>
			{__('Event Details')}
		</Heading>
		<GridItem>
			<div>
				<ActiveStatus status={status} onStatusChange={onStatusChange} />
				<EventManager eventManagers={eventManagers} managerId={managerId} onManagerChange={onManagerChange} />
				<EventPhoneNumber phoneNumber={phoneNumber} onPhoneNumberChange={onPhoneNumberChange} />
				<Donations allowDonations={allowDonations} onDonationsChange={onDonationsChange} />
		</div>
		</GridItem>
	</Grid>
);

export default EventDetails;
