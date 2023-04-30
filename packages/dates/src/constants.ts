import { __ } from '@eventespresso/i18n';

export const DEFAULT_DATE_FORMAT = 'MMM d, yyyy'; // Aug 19, 2020
export const DEFAULT_DATETIME_FORMAT = 'MMM d, yyyy h:mm aa'; // Aug 19, 2020 3:11 PM
export const DEFAULT_TIME_FORMAT = 'h:mm aa'; // 3:11 PM

export const endDateAfterStartDateErrorMessage = __('End Date & Time must be set later than the Start Date & Time');

export const startDateBeforeEndDateErrorMessage = __('Start Date & Time must be set before the End Date & Time');
