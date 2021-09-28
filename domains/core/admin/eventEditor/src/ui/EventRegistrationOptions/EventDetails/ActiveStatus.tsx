import { useMemo } from 'react';
import classNames from 'classnames';
// import { Box } from "@chakra-ui/react"

import { __ } from '@eventespresso/i18n';
import { GridItem, SelectWithLabel } from '@eventespresso/ui-components';
import { datetimeStatus } from '@eventespresso/constants';
import { objectToSelectOptions } from '@eventespresso/utils';
import type { EventRegistrationOptionsProps } from '../types';

interface Props extends Pick<EventRegistrationOptionsProps, 'status' | 'onStatusChange'> {}

const ActiveStatus: React.FC<Props> = ({ status, onStatusChange }) => {
	const id = 'ee-event-registration-active-status';

	const options = useMemo(() => objectToSelectOptions(datetimeStatus), []);

	return (
		<GridItem label={__('Active status')} className="ee-reg-option__active-status">
			<div className='ee-reg-option__value'>
				<SelectWithLabel
					flow='inline'
					id={`${id}-select`}
					noBorderColor
					onChangeValue={onStatusChange}
					options={options}
					value={status}
				/>
			</div>
		</GridItem>
	);
};

export default ActiveStatus;
