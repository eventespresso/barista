import { __ } from '@eventespresso/i18n';
import { InlineEditTextWithLabel } from '@eventespresso/ui-components';
import type { EventRegistrationOptionsProps } from '../types';

interface Props extends Pick<EventRegistrationOptionsProps, 'phoneNumber' | 'onPhoneNumberChange'> {}

const EventPhoneNumber: React.FC<Props> = ({ onPhoneNumberChange, phoneNumber }) => {
	return (
		<InlineEditTextWithLabel
			className='ee-edtr-option ee-edtr-option__event-phone'
			id='ee-event-registration-phone-number'
			onChange={onPhoneNumberChange}
			tag='h4'
			value={phoneNumber}
			label={__('Event Phone Number')}
			labelClassName='ee-grid__item-label'
			labelPosition='left-middle'
			placeholder='123-456-7890'
			wrapperClassName='ee-edtr-option__wrapper ee-edtr-option__event-phone-wrapper'
		/>
	);
};

export default EventPhoneNumber;
