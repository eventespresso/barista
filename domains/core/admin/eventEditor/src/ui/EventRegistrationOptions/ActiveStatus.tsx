import { useMemo } from 'react';
import classNames from 'classnames';

import { __ } from '@eventespresso/i18n';
import { SelectWithLabel } from '@eventespresso/ui-components';
import { DATETIME_STATUS_LABELS, POST_STATUSES } from '@eventespresso/constants';
import { objectToSelectOptions } from '@eventespresso/utils';
import { getDatetimeStatusBgColorClassName } from '@eventespresso/helpers';
import { useDatetimes } from '@eventespresso/edtr-services';
import { allDates, nextActiveUpcomingOnly, sortDates } from '@eventespresso/predicates';
import { isDatetime } from '@eventespresso/edtr-services';
import type { EventRegistrationOptionsProps } from './types';

interface Props extends Pick<EventRegistrationOptionsProps, 'status' | 'onStatusChange'> {}

const ActiveStatus: React.FC<Props> = ({ status, onStatusChange }) => {
	const datetimes = useDatetimes();
	const sortedDates = useMemo(() => sortDates({ dates: datetimes }), [datetimes]);
	let nextDate = nextActiveUpcomingOnly(sortedDates).shift();

	if (!nextDate || !isDatetime(nextDate)) {
		nextDate = allDates(sortedDates).shift();
	}

	const className = classNames(
		'ee-edtr-option',
		'ee-edtr-option__active-status',
		getDatetimeStatusBgColorClassName(nextDate)
	);

	const options = useMemo(() => objectToSelectOptions(DATETIME_STATUS_LABELS), []);

	const activeStatus = POST_STATUSES[status] !== undefined ? status : nextDate.status;

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
			value={activeStatus}
			wrapperClassName='ee-edtr-option__wrapper ee-edtr-option__active-status-wrapper'
		/>
	);
};

export default ActiveStatus;
