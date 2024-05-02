import * as R from 'ramda';
import { Factory as ConfigFactory } from '@eventespresso/config';
import type { Amount } from './types';

export class ParsedAmount {
	/** decimal places */
	private readonly dp: number;

	/** decimal mark */
	private readonly dm: string;

	constructor() {
		const {
			currency: { decimalMark, decimalPlaces },
		} = ConfigFactory.make();

		this.dp = decimalPlaces;
		this.dm = decimalMark;
	}

	public parse = (amount: Amount, fallback: number = 0): number => {
		if (this.isNullOrUndefined(amount)) return fallback;
		if (this.isNumber(amount)) return amount;
		return this.parseString(amount, fallback);
	};

	private isNullOrUndefined = (amount: Amount): amount is null | undefined => {
		if (amount === null) return true;
		if (amount === undefined) return true;
		return false;
	};

	private isNumber = (amount: Amount): amount is number => {
		if (typeof amount === 'number') return true;
		return false;
	};

	private parseString = (amount: string, fallback: number): number => {
		const pipe = R.pipe(this.removeChars, this.removeExcessDecimals);
		const string = pipe(amount);
		const float = Number.parseFloat(string);
		if (Number.isNaN(float)) return fallback;
		return float;
	};

	private removeChars = (amount: string): string => {
		const regex = new RegExp(String.raw`[^\d${this.dm}]`, 'g');
		return amount.replaceAll(regex, '');
	};

	private removeExcessDecimals = (amount: string): string => {
		if (!amount.includes(this.dm)) return amount;
		const [integers, decimals] = amount.split(this.dm);
		if (decimals.length > this.dp) {
			return integers + this.dm + decimals.substring(0, this.dp);
		}
		return amount;
	};
}
