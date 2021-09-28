import { __ } from '@eventespresso/i18n';
import { GridItem, Select } from '@eventespresso/ui-components';
import { regStatusOptions } from '@eventespresso/predicates';
import type { EventRegistrationOptionsProps } from '../types';

interface Props extends Pick<EventRegistrationOptionsProps, 'defaultRegStatus' | 'onDefaultRegStatusChange'> {}

const DefaultRegistrationStatus: React.FC<Props> = ({ defaultRegStatus, onDefaultRegStatusChange }) => {
	const id = 'ee-event-registration-default-status';

	return (
		<GridItem id={id} label={__('Default Registration Status')} className='ee-reg-option__default-status'>
			<div className='ee-reg-option__value'>
				<Select
					flow='inline'
					id={`${id}-select`}
					noBorderColor
					onChangeValue={onDefaultRegStatusChange}
					options={regStatusOptions}
					value={defaultRegStatus}
				/>
			</div>
		</GridItem>
	);
};

export default DefaultRegistrationStatus;
