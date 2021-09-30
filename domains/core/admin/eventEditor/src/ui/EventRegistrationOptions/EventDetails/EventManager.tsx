import { useMemo } from 'react';

import { __ } from '@eventespresso/i18n';
import { entityListToSelectOptions } from '@eventespresso/utils';
import { SelectWithLabel } from '@eventespresso/ui-components';
import type { EventRegistrationOptionsProps } from '../types';

interface Props extends Pick<EventRegistrationOptionsProps, 'eventManagers' | 'managerId' | 'onManagerChange'> {}

const EventManager: React.FC<Props> = ({ eventManagers, managerId, onManagerChange }) => {
	const id = 'ee-event-registration-manager';

	const options = useMemo(() => eventManagers && entityListToSelectOptions(eventManagers), [eventManagers]);

	return (
		<SelectWithLabel
			className='ee-reg-option__event-manager'
			label={__('Event Manager')}
			fitContainer
			flow='inline'
			id={`${id}-select`}
			noBorderColor
			onChangeValue={onManagerChange}
			options={options}
			value={managerId}
			labelClassName='ee-grid__item-label'
			labelPosition='left-middle'
		/>
	);
};

export default EventManager;
