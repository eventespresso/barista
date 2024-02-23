import type { Datetime } from '@eventespresso/edtr-services';

import { getUpdatedDatetimeStatus } from './getUpdatedDatetimeStatus';

export const getDatetimeBackgroundColorClassName = (date: Datetime): string => {
	return `ee-status-bg--${getUpdatedDatetimeStatus(date)}`;
};
