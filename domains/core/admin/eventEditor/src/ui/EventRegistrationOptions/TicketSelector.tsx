import { __ } from '@eventespresso/i18n';
import { SwitchWithLabel } from '@eventespresso/ui-components';
import type { EventRegistrationOptionsProps } from './types';

interface Props extends Pick<EventRegistrationOptionsProps, 'displayTicketSelector' | 'onTicketSelectorChange'> {}

const TicketSelector: React.FC<Props> = ({ displayTicketSelector: isChecked, onTicketSelectorChange }) => {
	const label = isChecked ? __('Ticket Selector Enabled') : __('Ticket Selector Disabled');

	return (
		<SwitchWithLabel
			id='ee-event-registration-ticket-selector'
			label={label}
			className='ee-edtr-option ee-edtr-option__ticket'
			isChecked={isChecked}
			onChangeValue={onTicketSelectorChange}
			debounceDelay={5000}
			labelClassName='ee-grid__item-label'
			labelPosition='left-middle'
			wrapperClassName='ee-edtr-option__wrapper ee-edtr-option__ticket-wrapper'
		/>
	);
};

export default TicketSelector;
