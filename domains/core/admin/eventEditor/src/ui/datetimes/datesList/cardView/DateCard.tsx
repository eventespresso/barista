import { useMemo } from 'react';
import { EntityActionsMenuLayout } from '@eventespresso/ui-components';
import { datetimeStatusBgColorClassName } from '@eventespresso/helpers';
import { EntityCard, EntityPaperFrame } from '@eventespresso/ui-components';
import { useDatetimeItem } from '@eventespresso/edtr-services';
import { __ } from '@eventespresso/i18n';

import DateActionsMenu from '../actionsMenu/DateActionsMenu';
import DateCardSidebar from './DateCardSidebar';
import Details from './Details';
import type { DateItemProps } from '../types';

import { useUtcISOToSiteDate } from '@eventespresso/services';

const DateCard: React.FC<DateItemProps> = ({ id }) => {
	const date = useDatetimeItem({ id });
	const bgClassName = datetimeStatusBgColorClassName(date);

	const toSiteDate = useUtcISOToSiteDate();

	const ariaLabel: string = useMemo(() => {
		const name = date.name.length > 0 ? date.name : 'datetime';
		const start = toSiteDate(date.startDate);
		const end = toSiteDate(date.endDate);
		return `${name} between ${start} and ${end}`;
	}, [date, toSiteDate]);

	const ariaDescription: string = useMemo(() => {
		const description = date.description;
		if (description.length === 0) {
			return __('missing datetime description');
		}
		return description.trim();
	}, [date]);

	const {
		AriaLabel: { Provider: AriaLabel },
		AriaDescription: { Provider: AriaDescription },
	} = EntityPaperFrame['Contexts'];

	return date ? (
		<AriaLabel value={ariaLabel}>
			<AriaDescription value={ariaDescription}>
				<EntityCard
					actionsMenu={<DateActionsMenu entity={date} layout={EntityActionsMenuLayout.Vertical} />}
					details={<Details entity={date} />}
					entity={date}
					sidebar={<DateCardSidebar entity={date} />}
					sidebarClass={bgClassName}
				/>
			</AriaDescription>
		</AriaLabel>
	) : null;
};

export default DateCard;
