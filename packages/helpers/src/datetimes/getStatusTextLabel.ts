import type { Datetime } from '@eventespresso/edtr-services';
import { datetimeStatusLabels } from '@eventespresso/constants';

const getStatusTextLabel = (date: Datetime): string => {
	if (datetimeStatusLabels.hasOwnProperty(date.status)) {
		return datetimeStatusLabels[date.status];
	}

	return datetimeStatusLabels['TO_BE_DETERMINED'];
};

export default getStatusTextLabel;
