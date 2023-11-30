import { __ } from '@eventespresso/i18n';

import type { Datetime } from '@eventespresso/edtr-services';
import { datetimeStatusLabels } from '@eventespresso/constants';

const getStatusTextLabel = (date: Datetime): string => {
	if (datetimeStatusLabels.hasOwnProperty(date.status)) {
		return datetimeStatusLabels[date.status];
	}

	return __('TBD');
};

export default getStatusTextLabel;
