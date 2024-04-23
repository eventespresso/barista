import type { CurrencyProps } from './types';

export const Currency = (config?: Partial<CurrencyProps>): CurrencyProps => {
	return {
		...defaultCurrency,
		...config,
	};
};

const defaultCurrency: CurrencyProps = {
	code: 'USD',
	singularLabel: 'Dollar',
	pluralLabel: 'Dollars',
	sign: '$',
	signB4: false,
	decimalPlaces: 2,
	decimalMark: '.',
	thousandsSeparator: ',',
};
