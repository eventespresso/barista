import type { Datetime } from '@eventespresso/edtr-services';
import { DATETIME_STATUS_LABELS } from '@eventespresso/constants';

export const getDatetimeStatusTextLabel = (date: Datetime): string => {
	if (DATETIME_STATUS_LABELS.hasOwnProperty(date.status)) {
		return DATETIME_STATUS_LABELS[date.status];
	}

	return DATETIME_STATUS_LABELS['TO_BE_DETERMINED'];
};
