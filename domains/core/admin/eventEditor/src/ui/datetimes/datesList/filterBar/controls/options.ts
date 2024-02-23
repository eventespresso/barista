/* eslint-disable @wordpress/i18n-translator-comments */
import { __ } from '@eventespresso/i18n';

import { DisplayStartOrEndDate } from '@eventespresso/edtr-services';

import { DatetimeSalesFilters, DatetimeStatusFilters } from '@eventespresso/predicates';

export const displayStartOrEndDateOptions = {
	[DisplayStartOrEndDate.start]: __('start dates only'),
	[DisplayStartOrEndDate.end]: __('end dates only'),
	[DisplayStartOrEndDate.both]: __('start and end dates'),
};

export const salesOptions = {
	[DatetimeSalesFilters.all]: __('all dates'),
	[DatetimeSalesFilters.above90Capacity]: __('dates above 90% capacity'),
	[DatetimeSalesFilters.above75Capacity]: __('dates above 75% capacity'),
	[DatetimeSalesFilters.above50Capacity]: __('dates above 50% capacity'),
	[DatetimeSalesFilters.below50Capacity]: __('dates below 50% capacity'),
};

export const statusOptions = {
	[DatetimeStatusFilters.all]: __('all dates'),
	[DatetimeStatusFilters.activeUpcoming]: __('all active and upcoming'),
	[DatetimeStatusFilters.activeOnly]: __('active dates only'),
	[DatetimeStatusFilters.upcomingOnly]: __('upcoming dates only'),
	[DatetimeStatusFilters.nextActiveUpcomingOnly]: __('next active or upcoming only'),
	[DatetimeStatusFilters.soldOutOnly]: __('sold out dates only'),
	[DatetimeStatusFilters.recentlyExpiredOnly]: __('recently expired dates'),
	[DatetimeStatusFilters.expiredOnly]: __('all expired dates'),
	[DatetimeStatusFilters.trashedOnly]: __('trashed dates only'),
};

export const sortByOptions = {
	date: __('start date'),
	name: __('name'),
	id: __('ID'),
	order: __('custom order'),
};

export const labels = {
	displayStartOrEndDate: __('display'),
	recurrence: __('recurrence'),
	sales: __('sales'),
	sortBy: __('sort by'),
	search: __('search'),
	status: __('status'),
};
