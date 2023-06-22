export type IntervalType =
	| 'days'
	| 'hours'
	| 'ISOWeekYears'
	| 'milliseconds'
	| 'minutes'
	| 'months'
	| 'quarters'
	| 'seconds'
	| 'weeks'
	| 'years';

export type TzDateFn = (date: Date | string | number, timezone: string) => Date;

export type Intervals = { [key in IntervalType]?: string };

export type ShiftDateArgs = {
	unit: IntervalType;
	value: number;
	type: 'earlier' | 'later';
};

export type PrepSingleDateComparisonFunc = (firstDate: Date | number, considerTime: boolean) => Date;

interface DateComparison<T> {
	(firstDate: Date | number, secondDate: Date | number, considerTime?: boolean): T;
}

export type DateComparisonFunc = DateComparison<boolean>;

export type PrepDatesComparisonFunc = DateComparison<[Date, Date]>;

interface UseDatePickerValidationReturn {
	startDateIsValid: boolean;
	startDateIsToday: boolean;
	startDateAfterToday: boolean;
	startDateBeforeEndDate: boolean;
	endDateIsValid: boolean;
	endDateIsToday: boolean;
	endDateAfterToday: boolean;
	endDateAfterStartDate: boolean;
}

// for comparing a date against NOW
export type SingleDateComparisonFunc = (firstDate: Date | number, considerTime?: boolean) => boolean;

export type UseDatePickerValidation = DateComparison<UseDatePickerValidationReturn>;
