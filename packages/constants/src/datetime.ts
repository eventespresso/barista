import { __ } from '@eventespresso/i18n';

export const datetimesDroppableId = 'date-entities-droppable';

export const datetimeStatus = {
	isActive: __('Active'),
	isCancelled: __('Cancelled'),
	isExpired: __('Expired'),
	isInactive: __('Inactive'),
	isPostponed: __('Postponed'),
	isSoldOut: __('Sold Out'),
	isUpcoming: __('Upcoming'),
	isTBD: __('TBD'),
};

export const datetimeStatusLabels = {
	ACTIVE: __('Active'),
	CANCELLED: __('Cancelled'),
	EXPIRED: __('Expired'),
	INACTIVE: __('Inactive'),
	POSTPONED: __('Postponed'),
	SOLD_OUT: __('Sold Out'),
	UPCOMING: __('Upcoming'),
	TRASHED: __('Trashed'),
	TO_BE_DETERMINED: __('TBD'),
};

export const datetimeStatusCodesMap = {
	ACTIVE: 'DTA',
	CANCELLED: 'DTC',
	EXPIRED: 'DTE',
	INACTIVE: 'DTI',
	POSTPONED: 'DTP',
	SOLD_OUT: 'DTB',
	TO_BE_DETERMINED: 'DTB',
	TRASHED: 'DTT',
	UPCOMING: 'DTU',
};

export const datetimeStatusOptions = {
	DTA: __('Active'),
	DTB: __('To Be Determined'),
	DTC: __('Cancelled'),
	DTE: __('Expired'),
	DTI: __('Inactive'),
	DTP: __('Postponed'),
	DTS: __('Sold Out'),
	DTT: __('Trashed'),
	DTU: __('Upcoming'),
};

export const userSelectableDatetimeStatusOptions = {
	DTC: __('Cancelled'),
	DTP: __('Postponed'),
	DTS: __('Sold Out'),
	DTB: __('To Be Determined'),
};
