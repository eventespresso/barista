import { __ } from '@eventespresso/i18n';
import { GridItem, SwitchWithLabel } from '@eventespresso/ui-components';
import type { EventRegistrationOptionsProps } from '../types';

interface Props extends Pick<EventRegistrationOptionsProps, 'displayTicketSelector' | 'onTicketSelectorChange'> {}

const TicketSelector: React.FC<Props> = ({ displayTicketSelector: isChecked, onTicketSelectorChange }) => {
	const id = 'ee-event-registration-ticket-selector';
	const label = isChecked ? __('Ticket Selector Enabled') : __('Ticket Selector Disabled');

	return (
		<GridItem id={id} label={label} className="ee-reg-option__ticket">
			<SwitchWithLabel
				aria-describedby={id}
				isChecked={isChecked}
				onChangeValue={onTicketSelectorChange}
				debounceDelay={5000}
			/>
		</GridItem>
	);
};

export default TicketSelector;
