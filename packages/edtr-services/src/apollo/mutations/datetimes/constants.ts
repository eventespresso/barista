import type { KeysOfType } from '..';
import type { DatetimeBaseInput } from './types';

export const NUMERIC_FIELDS: Array<KeysOfType<DatetimeBaseInput, number>> = [
	'capacity',
	'eventId',
	'order',
	'reserved',
	'sold',
];
