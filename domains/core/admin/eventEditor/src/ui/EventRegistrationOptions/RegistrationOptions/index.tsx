import { __ } from '@eventespresso/i18n';
import { Grid, Heading, GridItem } from '@eventespresso/ui-components';
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
	<Grid className="ee-grid--one">
		<Heading as='h3' className='ee-edtr-section-heading'>
			{__('Registration Options')}
		</Heading>
		<GridItem>
			<div>
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
			</div>
		</GridItem>
	</Grid>
);

export default RegistrationOptions;
