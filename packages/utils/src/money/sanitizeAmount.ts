// import type { Amount } from './types';

/**
 * returns amount parsed as a float (if not already a number)
 *
 * @param {number|string} amount
 * @return {number}
 */
export const sanitizeAmount = (amount: number | string): string => {
	let moneyValue: string = typeof amount === 'number' ? amount.toString() : amount;
	const regex = /[^0-9.]/g;
	moneyValue = moneyValue?.replace(regex, '');
	console.log('%c sanitizeAmount()', 'color: SkyBlue; font-size: 12px;');
	console.log('%c amount', 'color: SkyBlue;', amount);
	console.log('%c moneyValue', 'color: SkyBlue;', moneyValue);
	return moneyValue;
};
