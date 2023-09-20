import { useMemo, useCallback } from 'react';
import { EntityActionsMenuLayout } from '@eventespresso/ui-components';
import { datetimeStatusBgColorClassName } from '@eventespresso/helpers';
import { EntityCard, EntityPaperFrame } from '@eventespresso/ui-components';
import { useDatetimeItem } from '@eventespresso/edtr-services';
import { __ } from '@eventespresso/i18n';
import * as R from 'ramda';
import { useUtcISOToSiteDate, useSiteDateToUtcISO } from '@eventespresso/services';

import DateActionsMenu from '../actionsMenu/DateActionsMenu';
import DateCardSidebar from './DateCardSidebar';
import Details from './Details';
import type { DateItemProps } from '../types';

const DateCard: React.FC<DateItemProps> = ({ id }) => {
	const date = useDatetimeItem({ id });
	const bgClassName = datetimeStatusBgColorClassName(date);

	const toSiteDate = useUtcISOToSiteDate();
	const toUtcISO = useSiteDateToUtcISO();

	const dateToStr = useCallback(
		(timestamp: string): string => {
			// the order of functions is taken from
			// domains/core/admin/eventEditor/src/ui/datetimes/dateForm/useDateFormConfig.ts
			return R.pipe(toSiteDate, toUtcISO)(timestamp);
		},
		[toSiteDate, toUtcISO]
	);

	const startDate: string = useMemo(() => {
		return dateToStr(date.startDate);
	}, [date, dateToStr]);

	const endDate: string = useMemo(() => {
		return dateToStr(date.endDate);
	}, [date, dateToStr]);

	const ariaLabel: string = useMemo(() => {
		// since title is optional property in datetime, we need to consider that and provide a sane default value if title is missing
		const name = date.name.length > 0 ? date.name : 'datetime';
		// date formatting function was taken from useDateFormConfig() to match the UI behaviour of the form itself, for more details see
		// domains/core/admin/eventEditor/src/ui/datetimes/dateForm/useDateFormConfig.ts
		return `${name} between ${startDate} and ${endDate}`;
	}, [date, startDate, endDate]);

	const ariaDescription: string = useMemo(() => {
		const description = date.description;
		// since description is optional for datetime, we need to consider that and provide a sane default value if the description is missing
		if (description.length === 0) {
			return __('missing datetime description');
		}
		// since description is WYSIWYG, we need to trim newline chars and similar around the edges to avoid breaking HTML markup
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
