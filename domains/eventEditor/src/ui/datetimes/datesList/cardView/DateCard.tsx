import React from 'react';
import { CalendarDateSwitcher } from '@eventespresso/components';

import DateActionsMenu from '../actionsMenu/DateActionsMenu';
import { EntityActionsMenuLayout } from '@eventespresso/components';

import { getDatetimeStatusTextLabel, datetimeStatusBgColorClassName } from '@eventespresso/helpers';

import { EntityCard } from '@eventespresso/components';
import { useDatesListFilterState } from '@edtrServices/filterState';
import { getPropsAreEqual } from '@eventespresso/services';
import { useMemoStringify } from '@eventespresso/hooks';
import Details from './Details';
import type { DateItemProps } from '../types';

const DateCard: React.FC<DateItemProps> = ({ entity: date }) => {
	const bgClassName = datetimeStatusBgColorClassName(date);
	const { displayStartOrEndDate } = useDatesListFilterState();
	const footer = getDatetimeStatusTextLabel(date);
	const labels = useMemoStringify({ footer });

	return date ? (
		<EntityCard
			entity={date}
			cacheId={date.cacheId + displayStartOrEndDate}
			actionsMenu={<DateActionsMenu entity={date} layout={EntityActionsMenuLayout.Vertical} />}
			sidebar={
				<CalendarDateSwitcher
					className={bgClassName}
					displayDate={displayStartOrEndDate}
					endDate={date.endDate}
					labels={labels}
					startDate={date.startDate}
				/>
			}
			details={<Details entity={date} />}
		/>
	) : null;
};

export default React.memo(DateCard, getPropsAreEqual(['entity', 'cacheId']));
