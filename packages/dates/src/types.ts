import { ReactDatePickerProps } from 'react-datepicker';

type OmittedProps = 'value' | 'onChange' | 'locale';

// Omit value and on change to make them consistent with out own types
export interface DatePickerProps extends Omit<ReactDatePickerProps, OmittedProps> {
	inputValue?: string;
	onChange: (date: Date) => void;
	value?: Date;
	locale?: string;
}

export type DateRange = [Date, Date];

export interface DateRangePickerProps extends ShowTime, Omit<ReactDatePickerProps, OmittedProps> {
	endDateTZ?: React.ReactNode;
	endLabel?: string;
	inputValue?: [string, string];
	locale?: string; // "en-US", "en_US", "ar" etc.
	onChange: (dates: DateRange) => void;
	startLabel?: string;
	startDateTZ?: React.ReactNode;
	value?: DateRange;
}

export interface RangeFormatProps extends ShowTime {
	endDate: string;
	formatFn?: (date: Date, formatStr: string) => string;
	formatTokens: RangeFormatTokens;
	startDate: string;
}

export interface RangeFormatTokens {
	ampm?: string;
	day?: string;
	daySeparator?: string;
	hour?: string;
	min?: string;
	month?: string;
	monthSeparator?: string;
	timeSeparator?: string;
	year?: string;
	yearSeparator?: string;
}

export interface SalesDates {
	startDate: string | Date;
	endDate: string | Date;
}

export interface ShowTime {
	showTime?: boolean;
}
