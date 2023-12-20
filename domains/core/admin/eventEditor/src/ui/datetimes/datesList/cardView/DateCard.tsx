import { useMemo } from 'react';
import { EntityActionsMenuLayout, EntityCard, EntityPaperFrame } from '@eventespresso/ui-components';
import { datetimeStatusBgColorClassName } from '@eventespresso/helpers';
import { useDatetimeItem } from '@eventespresso/edtr-services';

import DateActionsMenu from '../actionsMenu/DateActionsMenu';
import DateCardSidebar from './DateCardSidebar';
import Details from './Details';
import type { DateItemProps } from '../types';

const DateCard: React.FC<DateItemProps> = ({ id }) => {
	const date = useDatetimeItem({ id });
	const bgClassName = datetimeStatusBgColorClassName(date);

	const ariaLabel: string = useMemo(() => {
		// since title is optional property in datetime, we need to consider that and provide a sane default value if title is missing
		return date?.name.length > 0 ? date.name : 'datetime';
	}, [date]);

	const {
		AriaLabel: { Provider: AriaLabel },
	} = EntityPaperFrame['Contexts'];

	return date ? (
		<AriaLabel value={ariaLabel}>
			<EntityCard
				actionsMenu={<DateActionsMenu entity={date} layout={EntityActionsMenuLayout.Vertical} />}
				details={<Details entity={date} />}
				entity={date}
				sidebar={<DateCardSidebar entity={date} />}
				sidebarClass={bgClassName}
			/>
		</AriaLabel>
	) : null;
};

export default DateCard;
