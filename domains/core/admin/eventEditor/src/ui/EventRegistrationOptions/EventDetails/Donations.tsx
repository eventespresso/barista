import { __ } from '@eventespresso/i18n';
import { SwitchWithLabel } from '@eventespresso/ui-components';
import type { EventRegistrationOptionsProps } from '../types';

interface Props extends Pick<EventRegistrationOptionsProps, 'allowDonations' | 'onDonationsChange'> {}

const Donations: React.FC<Props> = ({ allowDonations: isChecked, onDonationsChange }) => {
	const id = 'ee-event-donations';
	const label = isChecked ? __('Donations Enabled') : __('Donations Disabled');

	return (
		<SwitchWithLabel
			className='ee-reg-option__event-donations'
			id={id}
			label={label}
			aria-describedby={id}
			isChecked={isChecked}
			onChangeValue={onDonationsChange}
			debounceDelay={5000}
			labelClassName='ee-grid__item-label'
			labelPosition='left-middle'
		/>
	);
};

export default Donations;
