import type { Datetime } from '@eventespresso/constants';
import {
	DATETIME_STATUS_ID,
	isActive,
	isExpired,
	isDateSoldOut,
	isTrashed,
	isUpcoming,
} from '@eventespresso/predicates';

const status = (date: Datetime): string => {
	if (isTrashed(date)) {
		return DATETIME_STATUS_ID.TRASHED;
	}

	if (isExpired(date)) {
		return DATETIME_STATUS_ID.EXPIRED;
	}

	if (isDateSoldOut(date)) {
		return DATETIME_STATUS_ID.SOLD_OUT;
	}

	if (isUpcoming(date)) {
		return DATETIME_STATUS_ID.UPCOMING;
	}

	if (isActive(date)) {
		return DATETIME_STATUS_ID.ACTIVE;
	}

	return DATETIME_STATUS_ID.INACTIVE;
};

export default status;
