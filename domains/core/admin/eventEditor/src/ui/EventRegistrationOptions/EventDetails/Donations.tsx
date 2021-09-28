import { __ } from '@eventespresso/i18n';
import { GridItem, SwitchWithLabel } from '@eventespresso/ui-components';
import type { EventRegistrationOptionsProps } from '../types';

interface Props extends Pick<EventRegistrationOptionsProps, 'allowDonations' | 'onDonationsChange'> {}

const Donations: React.FC<Props> = ({ allowDonations: isChecked, onDonationsChange }) => {
	const id = 'ee-event-donations';
	const label = isChecked ? __('Donations Enabled') : __('Donations Disabled');

	return (
		<GridItem id={id} label={label} className="ee-reg-option__event-donations">
			<SwitchWithLabel
				aria-describedby={id}
				isChecked={isChecked}
				onChangeValue={onDonationsChange}
				debounceDelay={5000}
			/>
		</GridItem>
	);
};

export default Donations;
