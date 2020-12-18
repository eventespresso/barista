import React, { useMemo /* , { useCallback } */ } from 'react';
import classNames from 'classnames';

import { __ } from '@eventespresso/i18n';
import { noop } from '@eventespresso/utils';
import { datetimeStatusBgColorClassName } from '../../../../helpers/src';
import { GridItem, Select } from '../../';

import { objectToSelectOptions } from '@eventespresso/utils';

const status = {
	isActive: __('Active'),
	isCancelled: __('Cancelled'),
	isExpired: __('Expired'),
	isInactive: __('Inactive'),
	isPostponed: __('Postponed'),
	isSoldOut: __('SoldOut'),
	isUpcoming: __('Upcoming'),
};

const ActiveStatus: React.FC = () => {
	const bgColorClassName = datetimeStatusBgColorClassName(null);
	const className = classNames('ee-event-registration-options__status', bgColorClassName);

	const id = 'ee-event-registration-active-status';

	const options = useMemo(() => objectToSelectOptions(status), []);

	const input = <Select onChangeValue={noop} options={options} type='inline' value={status.isActive} />;

	return <GridItem className={className} id={id} input={input} label={__('Active status')} />;
};

export default ActiveStatus;
