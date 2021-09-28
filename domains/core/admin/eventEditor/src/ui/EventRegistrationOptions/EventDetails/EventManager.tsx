import { useMemo } from 'react';

import { __ } from '@eventespresso/i18n';
import { entityListToSelectOptions } from '@eventespresso/utils';
import { GridItem, Select } from '@eventespresso/ui-components';
import type { EventRegistrationOptionsProps } from '../types';

interface Props extends Pick<EventRegistrationOptionsProps, 'eventManagers' | 'managerId' | 'onManagerChange'> {}

const EventManager: React.FC<Props> = ({ eventManagers, managerId, onManagerChange }) => {
	const id = 'ee-event-registration-manager';

	const options = useMemo(() => eventManagers && entityListToSelectOptions(eventManagers), [eventManagers]);

	return (
		<GridItem id={id} label={__('Event Manager')} className='ee-reg-option__event-manager'>
			<div className='ee-reg-option__value'>
				<Select
					flow='inline'
					id={`${id}-select`}
					noBorderColor
					onChangeValue={onManagerChange}
					options={options}
					value={managerId}
				/>
			</div>
		</GridItem>
	);
};

export default EventManager;
