import { __ } from '@eventespresso/i18n';
import { GridItem, InlineEditText } from '@eventespresso/ui-components';
import type { EventRegistrationOptionsProps } from '../types';

interface Props extends Pick<EventRegistrationOptionsProps, 'phoneNumber' | 'onPhoneNumberChange'> {}

const EventPhoneNumber: React.FC<Props> = ({ onPhoneNumberChange, phoneNumber }) => {
	const id = 'ee-event-registration-phone-number';

	return (
		<GridItem id={id} label={__('Event Phone Number')} className='ee-reg-option__event-phone'>
			<div className='ee-reg-option__value'>
				<InlineEditText aria-describedby={id} onChange={onPhoneNumberChange} tag='h4' value={phoneNumber} />
			</div>
		</GridItem>
	);
};

export default EventPhoneNumber;
