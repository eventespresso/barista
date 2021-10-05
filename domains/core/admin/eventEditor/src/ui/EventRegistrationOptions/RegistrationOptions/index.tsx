import { __ } from '@eventespresso/i18n';
import { GridCard } from '@eventespresso/ui-components';
import { noop } from '@eventespresso/utils';

import AltRegPage from './AltRegPage';
import DefaultRegistrationStatus from './DefaultRegistrationStatus';
import MaxRegistrations from './MaxRegistrations';
import TicketSelector from './TicketSelector';

import type { EventRegistrationOptionsProps } from '../types';

const RegistrationOptions: React.FC<Partial<EventRegistrationOptionsProps>> = ({
	altRegPage,
	defaultRegStatus,
	displayTicketSelector,
	maxReg,
	onAltRegPageChange = noop,
	onDefaultRegStatusChange,
	onTicketSelectorChange,
	onMaxRegChange = noop,
}) => (
	<GridCard className='ee-reg-options' header={__('Registration Options')}>
		<>
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
		</>
	</GridCard>
);

export default RegistrationOptions;
