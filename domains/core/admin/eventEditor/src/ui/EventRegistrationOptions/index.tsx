import { __ } from '@eventespresso/i18n';
import { Grid, GridCard } from '@eventespresso/ui-components';
import { noop } from '@eventespresso/utils';
import { withFeature } from '@eventespresso/services';

import ActiveStatus from './ActiveStatus';
import AltRegPage from './AltRegPage';
import DefaultRegistrationStatus from './DefaultRegistrationStatus';
import Donations from './Donations';
import EventManager from './EventManager';
import EventPhoneNumber from './EventPhoneNumber';
import MaxRegistrations from './MaxRegistrations';
import TicketSelector from './TicketSelector';
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
	return (
		<Grid className='ee-edtr-section ee-edtr-cards' maxColumns={2} size='bigger'>
			<GridCard className='ee-event-details' header={__('Event Details')}>
				<ActiveStatus status={status} onStatusChange={onStatusChange} />
				<EventManager eventManagers={eventManagers} managerId={managerId} onManagerChange={onManagerChange} />
				<EventPhoneNumber phoneNumber={phoneNumber} onPhoneNumberChange={onPhoneNumberChange} />
				<Donations allowDonations={allowDonations} onDonationsChange={onDonationsChange} />
			</GridCard>
			<GridCard className='ee-reg-options' header={__('Registration Options')}>
				<DefaultRegistrationStatus
					defaultRegStatus={defaultRegStatus}
					onDefaultRegStatusChange={onDefaultRegStatusChange}
				/>
				<TicketSelector
					displayTicketSelector={displayTicketSelector}
					onTicketSelectorChange={onTicketSelectorChange}
				/>
				<MaxRegistrations maxReg={maxReg} onMaxRegChange={onMaxRegChange} />
				<AltRegPage altRegPage={altRegPage} onAltRegPageChange={onAltRegPageChange} />
			</GridCard>
		</Grid>
	);
};

export default withFeature('use_reg_options_meta_box')(withData(EventRegistrationOptions));
