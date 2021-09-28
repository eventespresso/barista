import { __ } from '@eventespresso/i18n';
import { GridItem, InlineEditText } from '@eventespresso/ui-components';
import type { EventRegistrationOptionsProps } from '../types';

interface Props extends Pick<EventRegistrationOptionsProps, 'maxReg' | 'onMaxRegChange'> {}

const MaxRegistrations: React.FC<Props> = ({ maxReg, onMaxRegChange }) => {
	const id = 'ee-event-registration-max-reg';
	const strValue = maxReg && String(maxReg);

	return (
		<GridItem id={id} label={__('Max Registrations per Transaction')} className="ee-reg-option__max-reg">
			<div className='ee-reg-option__value'>
				<InlineEditText
					aria-describedby={id}
					id={`${id}-inline-edit`}
					onChange={onMaxRegChange}
					tag='h4'
					value={strValue}
				/>
			</div>
		</GridItem>
	);
};

export default MaxRegistrations;
