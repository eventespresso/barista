import { useTimeZoneTime } from '@eventespresso/services';
import { CalendarDateSwitcher as CalendarDateSwitcherUI } from '@eventespresso/ui-components';

import type { CalendarDateSwitcherProps } from './types';

export const CalendarDateSwitcher: React.FC<CalendarDateSwitcherProps> = (props) => {
	const { formatForSite } = useTimeZoneTime();

	return <CalendarDateSwitcherUI formatFn={formatForSite} {...props} />;
};
