import { useMemo } from 'react';
import classNames from 'classnames';

import { __ } from '@eventespresso/i18n';
import { SelectWithLabel } from '@eventespresso/ui-components';
import { datetimeStatus } from '@eventespresso/constants';
import { objectToSelectOptions } from '@eventespresso/utils';
import { datetimeStatusBgColorClassName } from '@eventespresso/helpers';
import type { EventRegistrationOptionsProps } from '../types';

interface Props extends Pick<EventRegistrationOptionsProps, 'status' | 'onStatusChange'> {}

const ActiveStatus: React.FC<Props> = ({ status, onStatusChange }) => {
	const className = classNames(
		'ee-status-background',
		'ee-edtr-option',
		'ee-edtr-option__active-status',
		datetimeStatusBgColorClassName(null)
	);

	const options = useMemo(() => objectToSelectOptions(datetimeStatus), []);

	return (
		<SelectWithLabel
			className={className}
			fitContainer
			flow='inline'
			id='ee-event-registration-active-status-select'
			label={__('Active status')}
			labelClassName='ee-grid__item-label'
			labelPosition='left-middle'
			noBorderColor
			onChangeValue={onStatusChange}
			options={options}
			value={status}
			wrapperClassName='ee-edtr-option__wrapper ee-edtr-option__active-status-wrapper'
		/>
	);
};

export default ActiveStatus;
