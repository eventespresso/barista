import type { Datetime } from '@eventespresso/edtr-services';
import {
	DATETIME_STATUS_ID,
	isActive,
	isCancelled,
	isExpired,
	isDateSoldOut,
	isPostponed,
	isTrashed,
	isUpcoming,
} from '@eventespresso/predicates';

export const getUpdatedDatetimeStatus = (date: Datetime, ignoreFlag = false): string => {
	if (isCancelled(date)) {
		return DATETIME_STATUS_ID.CANCELLED;
	}
	if (isPostponed(date)) {
		return DATETIME_STATUS_ID.POSTPONED;
	}
	if (isTrashed(date)) {
		return DATETIME_STATUS_ID.TRASHED;
	}

	if (isExpired(date, ignoreFlag)) {
		return DATETIME_STATUS_ID.EXPIRED;
	}

	if (isDateSoldOut(date)) {
		return DATETIME_STATUS_ID.SOLD_OUT;
	}

	if (isUpcoming(date, ignoreFlag)) {
		return DATETIME_STATUS_ID.UPCOMING;
	}

	if (isActive(date, ignoreFlag)) {
		return DATETIME_STATUS_ID.ACTIVE;
	}

	return DATETIME_STATUS_ID.INACTIVE;
};
