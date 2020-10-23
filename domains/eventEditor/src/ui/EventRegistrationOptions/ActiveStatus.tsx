import React, { useCallback } from 'react';

import { __ } from '@eventespresso/i18n';
import { Heading, InlineEditSelect } from '@eventespresso/components';
import { objectToSelectOptions } from '@eventespresso/utils';
import { useEvent } from '@eventespresso/edtr-services';

const status = {
	isActive: __('Active'),
	isCancelled: __('Cancelled'),
	isExpired: __('Expired'),
	isInactive: __('Inactive'),
	isPostponed: __('Postponed'),
	isSoldOut: __('SoldOut'),
	isUpcoming: __('Upcoming'),
};

const options = objectToSelectOptions(status);

const ActiveStatus: React.FC = () => {
	const event = useEvent();

	const onChange = useCallback(() => {
		console.log({ event });
	}, [event]);

	const id = 'ee-event-registration-active-status';

	return (
		<div>
			<Heading as='h4' id={id}>
				{__('Active Status')}
			</Heading>
			<InlineEditSelect aria-describedby={id} onChange={onChange} options={options} value={'isUpcoming'} />
		</div>
	);
};

export default ActiveStatus;
