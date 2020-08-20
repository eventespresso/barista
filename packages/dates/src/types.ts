import React from 'react';
import { ReactDatePickerProps } from 'react-datepicker';
import type { LocaleProps } from '@eventespresso/services';

type OmittedProps = 'value' | 'onChange' | 'locale';

// Omit value and on change to make them consistent with out own types
export interface DatePickerProps extends Omit<ReactDatePickerProps, OmittedProps> {
	inputValue?: string;
	onChange: (date: Date) => void;
	value?: Date;
	locale?: LocaleProps;
}

export type DateRange = [Date, Date];

export interface DateRangePickerProps extends Omit<ReactDatePickerProps, OmittedProps> {
	inputValue?: [string, string];
	value?: DateRange;
	onChange: (dates: DateRange) => void;
	separator?: React.ReactNode;
	showTime?: boolean;
	locale?: string; // "en-US", "en_US", "ar" etc.
}
