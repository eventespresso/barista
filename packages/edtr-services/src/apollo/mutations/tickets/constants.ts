import type { KeysOfType } from '@eventespresso/utils';
import { TicketBaseInput } from './types';

export const NUMERIC_FIELDS: Array<KeysOfType<TicketBaseInput, number>> = [
	'max',
	'min',
	'order',
	'price',
	'quantity',
	'reserved',
	'row',
	'sold',
	'uses',
	'wpUser',
];

export const BOOLEAN_FIELDS: Array<KeysOfType<TicketBaseInput, boolean>> = [
	'isDefault',
	'isRequired',
	'isTrashed',
	'reverseCalculate',
];
