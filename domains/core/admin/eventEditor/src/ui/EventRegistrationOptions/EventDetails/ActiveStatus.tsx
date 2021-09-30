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
	const bgColorClassName = datetimeStatusBgColorClassName(null);
	const className = classNames('ee-status-background', bgColorClassName, 'ee-reg-option__active-status');
	const id = 'ee-event-registration-active-status';

	const options = useMemo(() => objectToSelectOptions(datetimeStatus), []);

	return (
		<SelectWithLabel
			className={className}
			label={__('Active status')}
			fitContainer
			flow='inline'
			id={`${id}-select`}
			noBorderColor
			onChangeValue={onStatusChange}
			options={options}
			value={status}
			labelClassName='ee-grid__item-label'
			labelPosition='left-middle'
		/>
	);
};

export default ActiveStatus;
