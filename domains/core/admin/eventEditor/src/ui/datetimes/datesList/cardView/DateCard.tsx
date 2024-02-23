import { useMemo } from 'react';
import { EntityActionsMenuLayout, EntityCard, EntityPaperFrame } from '@eventespresso/ui-components';
import { getDatetimeStatusBgColorClassName } from '@eventespresso/helpers';
import { modifyDatetimeStatusBasedOnTickets, useDatetimeItem } from '@eventespresso/edtr-services';

import DateActionsMenu from '../actionsMenu/DateActionsMenu';
import DateCardSidebar from './DateCardSidebar';
import Details from './Details';
import type { DateItemProps } from '../types';

const DateCard: React.FC<DateItemProps> = ({ id }) => {
	const origDatetime = useDatetimeItem({ id });
	const datetime = modifyDatetimeStatusBasedOnTickets(origDatetime);
	const bgClassName = getDatetimeStatusBgColorClassName(datetime);

	const ariaLabel: string = useMemo(() => {
		// since title is optional property in datetime, we need to consider that and provide a sane default value if title is missing
		return datetime?.name.length > 0 ? datetime.name : 'datetime';
	}, [datetime]);

	const {
		AriaLabel: { Provider: AriaLabel },
	} = EntityPaperFrame['Contexts'];

	return datetime ? (
		<AriaLabel value={ariaLabel}>
			<EntityCard
				actionsMenu={<DateActionsMenu entity={datetime} layout={EntityActionsMenuLayout.Vertical} />}
				details={<Details entity={datetime} />}
				entity={datetime}
				sidebar={<DateCardSidebar entity={datetime} />}
				sidebarClass={bgClassName}
			/>
		</AriaLabel>
	) : null;
};

export default DateCard;
