import type { FormStateManager as FSM } from '../../data';

export type DateType = 'gDate' | 'rDate' | 'exDate';

export type GeneratedDate = {
	date: Date;
	type: DateType;
	ISOStr: string; // ISO date string
};

export type GeneratedDateClassName =
	| 'ee-generated-date--gDate'
	| 'ee-generated-date--rDate'
	| 'ee-generated-date--exDate';

export interface GeneratedDatetimeProps extends GeneratedDate {
	number: number;
	toggleExDate: FSM['addRDate']; // signature is same as addRDate
	exDatesLimitReached?: boolean;
}

export interface GeneratedDatetimesProps {
	datetimes: Array<GeneratedDate>;
}
