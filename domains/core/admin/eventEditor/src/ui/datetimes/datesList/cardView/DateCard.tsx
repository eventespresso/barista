import { useMemo } from 'react';

import { EntityActionsMenuLayout } from '@eventespresso/ui-components';
import { datetimeStatusBgColorClassName } from '@eventespresso/helpers';
import { EntityCard } from '@eventespresso/ui-components';
import { useDatetimeItem, useVenues } from '@eventespresso/edtr-services';
import { findEntityByGuid } from '@eventespresso/predicates';

import DateActionsMenu from '../actionsMenu/DateActionsMenu';
import DateCardSidebar from './DateCardSidebar';
import Details from './Details';
import type { DateItemProps } from '../types';

const DateCard: React.FC<DateItemProps> = ({ id }) => {
	const date = useDatetimeItem({ id });
	const bgClassName = datetimeStatusBgColorClassName(date);
	const selectedVenueId = date?.venue;

	const venues = useVenues();
	const selectedVenue = useMemo(() => findEntityByGuid(venues)(selectedVenueId), [selectedVenueId, venues]);
	const thumbnail = selectedVenue?.thumbnail;

	return date ? (
		<EntityCard
			bg={thumbnail}
			actionsMenu={<DateActionsMenu entity={date} layout={EntityActionsMenuLayout.Vertical} />}
			details={<Details entity={date} />}
			entity={date}
			sidebar={<DateCardSidebar entity={date} />}
			sidebarClass={bgClassName}
		/>
	) : null;
};

export default DateCard;
