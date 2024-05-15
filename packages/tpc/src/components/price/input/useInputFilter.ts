import * as R from 'ramda';

import { Factory } from '@eventespresso/config';

export const useInputFilter: HookFn = () => {
	return R.pipe(useTruncate, useStrip);
};

/**
 * Truncate input to 6 decimal places
 */
const useTruncate: PipeFn = (input) => {
	const decimalPlaces = 6;

	const {
		currency: { decimalMark: mark },
	} = Factory.make();

	if (!input.includes(mark)) return input;

	const [integers, decimals] = input.split(mark);

	if (decimals.length <= decimalPlaces) return input;

	return integers + mark + decimals.substring(0, decimalPlaces);
};

/**
 * Remove illegal input characters
 */
const useStrip: PipeFn = (input) => {
	const pattern = usePattern();
	return input.replaceAll(pattern, '');
};

/**
 * Regular expression pattern with 6 decimal places and localized decimal mark
 */
export const usePattern = (): string => {
	const {
		currency: { decimalMark: mark },
	} = Factory.make();

	const integers = '[0-9]*?'; // lazy but greedy quantifier
	const separator = '\\' + mark;
	const decimals = '[0-9]{0,6}';

	return integers + separator + decimals;
};

type HookFn = () => PipeFn;
type PipeFn = (input: string) => string;
