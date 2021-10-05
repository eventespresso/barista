import { useMemo } from 'react';

import { __ } from '@eventespresso/i18n';
import { entityListToSelectOptions } from '@eventespresso/utils';
import { SelectWithLabel } from '@eventespresso/ui-components';
import type { EventRegistrationOptionsProps } from '../types';

interface Props extends Pick<EventRegistrationOptionsProps, 'eventManagers' | 'managerId' | 'onManagerChange'> {}

const EventManager: React.FC<Props> = ({ eventManagers, managerId, onManagerChange }) => {
	const options = useMemo(() => eventManagers && entityListToSelectOptions(eventManagers), [eventManagers]);

	return (
		<SelectWithLabel
			className='ee-edtr-option ee-edtr-option__event-manager'
			label={__('Event Manager')}
			fitContainer
			flow='inline'
			id='ee-event-registration-manager'
			noBorderColor
			onChangeValue={onManagerChange}
			options={options}
			value={managerId}
			labelClassName='ee-grid__item-label'
			labelPosition='left-middle'
			wrapperClassName='ee-edtr-option__wrapper ee-edtr-option__event-manager-wrapper'
		/>
	);
};

export default EventManager;
