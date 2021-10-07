import { __ } from '@eventespresso/i18n';
import { SwitchWithLabel } from '@eventespresso/ui-components';
import type { EventRegistrationOptionsProps } from './types';

interface Props extends Pick<EventRegistrationOptionsProps, 'allowDonations' | 'onDonationsChange'> {}

const Donations: React.FC<Props> = ({ allowDonations: isChecked, onDonationsChange }) => {
	const label = isChecked ? __('Donations Enabled') : __('Donations Disabled');

	return (
		<SwitchWithLabel
			className='ee-edtr-option ee-edtr-option__event-donations'
			id='ee-event-donations'
			label={label}
			isChecked={isChecked}
			onChangeValue={onDonationsChange}
			debounceDelay={5000}
			labelClassName='ee-grid__item-label'
			labelPosition='left-middle'
			wrapperClassName='ee-edtr-option__wrapper ee-edtr-option__event-donations-wrapper'
		/>
	);
};

export default Donations;
