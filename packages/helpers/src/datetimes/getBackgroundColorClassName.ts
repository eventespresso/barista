import type { Datetime } from '@eventespresso/constants';

import status from './status';

const getBackgroundColorClassName = (date: Datetime): string => {
	return `ee-status-bg--${status(date)}`;
};

export default getBackgroundColorClassName;
