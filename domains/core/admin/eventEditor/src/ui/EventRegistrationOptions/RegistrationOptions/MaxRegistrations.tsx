import { __ } from '@eventespresso/i18n';
import { InlineEditTextWithLabel } from '@eventespresso/ui-components';
import type { EventRegistrationOptionsProps } from '../types';

interface Props extends Pick<EventRegistrationOptionsProps, 'maxReg' | 'onMaxRegChange'> {}

const MaxRegistrations: React.FC<Props> = ({ maxReg, onMaxRegChange }) => {
	const id = 'ee-event-registration-max-reg';
	const strValue = maxReg && String(maxReg);

	return (
		<InlineEditTextWithLabel
			id={id}
			label={__('Max Registrations per Transaction')}
			className='ee-reg-option__max-reg'
			labelClassName='ee-grid__item-label'
			labelPosition='left-middle'
			aria-describedby={id}
			onChange={onMaxRegChange}
			tag='h4'
			value={strValue}
		/>
	);
};

export default MaxRegistrations;
