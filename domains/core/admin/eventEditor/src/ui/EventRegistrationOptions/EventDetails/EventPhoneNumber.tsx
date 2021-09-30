import { __ } from '@eventespresso/i18n';
import { InlineEditTextWithLabel } from '@eventespresso/ui-components';
import type { EventRegistrationOptionsProps } from '../types';

interface Props extends Pick<EventRegistrationOptionsProps, 'phoneNumber' | 'onPhoneNumberChange'> {}

const EventPhoneNumber: React.FC<Props> = ({ onPhoneNumberChange, phoneNumber }) => {
	const id = 'ee-event-registration-phone-number';

	return (
		<InlineEditTextWithLabel
			className='ee-reg-option__event-phone'
			id={id}
			onChange={onPhoneNumberChange}
			tag='h4'
			value={phoneNumber}
			label={__('Event Phone Number')}
			labelClassName='ee-grid__item-label'
			labelPosition='left-middle'
		/>
	);
};

export default EventPhoneNumber;
