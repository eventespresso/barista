import type { Datetime } from '@eventespresso/edtr-services';

import status from './status';

const getBackgroundColorClassName = (date: Datetime): string => {
	return `ee-status-background-color--${status(date)}`;
};

export default getBackgroundColorClassName;
