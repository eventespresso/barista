import { __ } from '@eventespresso/i18n';
import { InlineEditTextWithLabel } from '@eventespresso/ui-components';
import type { EventRegistrationOptionsProps } from '../types';

interface Props extends Pick<EventRegistrationOptionsProps, 'maxReg' | 'onMaxRegChange'> {}

const MaxRegistrations: React.FC<Props> = ({ maxReg, onMaxRegChange }) => {
	const strValue = maxReg && String(maxReg);

	return (
		<InlineEditTextWithLabel
			id='ee-event-registration-max-reg'
			label={__('Max Registrations per Transaction')}
			className='ee-edtr-option ee-edtr-option__max-reg'
			labelClassName='ee-grid__item-label'
			labelPosition='left-middle'
			onChange={onMaxRegChange}
			tag='h4'
			value={strValue}
			wrapperClassName='ee-edtr-option__wrapper ee-edtr-option__max-reg-wrapper'
		/>
	);
};

export default MaxRegistrations;
