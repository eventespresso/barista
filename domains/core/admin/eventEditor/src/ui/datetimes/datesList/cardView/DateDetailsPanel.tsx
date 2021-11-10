import { useMemo } from 'react';

import { __ } from '@eventespresso/i18n';

import { EntityDetailsPanel } from '@eventespresso/ui-components';
import { DateRegistrationsLink } from '../DateRegistrationsLink';
import { DateSoldLink } from '../DateSoldLink';
import DateCapacity from './DateCapacity';
import type { DateItemProps } from '../types';

const DateDetailsPanel: React.FC<DateItemProps> = ({ entity: datetime }) => {
	const details = useMemo(
		() => [
			{
				id: 'ee-event-date-sold',
				label: __('sold'),
				value: <DateSoldLink datetime={datetime} />,
			},
			{
				id: 'ee-event-date-capacity',
				label: __('capacity'),
				value: <DateCapacity entity={datetime} />,
			},
			{
				id: 'ee-event-date-registrations',
				className: 'ee-has-tooltip',
				label: __('reg list'),
				value: <DateRegistrationsLink datetime={datetime} />,
			},
		],
		[datetime]
	);

	return <EntityDetailsPanel details={details} className='ee-editor-date-details-sold-rsrvd-cap-div' />;
};

export default DateDetailsPanel;
