import type { Type } from '.';

export const Currency = (config?: Partial<Type.Currency>): Type.Currency => {
	const { subunits: exclude, ...defaults } = defaultCurrency;
	const subunits = Subunits(config);
	return { ...defaults, ...config, subunits };
};

function Subunits(config?: Partial<Type.Currency>): Type.Currency['subunits'] {
	if (config?.subunits) return config.subunits;
	const dp = config?.decimalPlaces ?? defaultCurrency.decimalPlaces;
	return Math.pow(10, dp);
}

const defaultCurrency: Type.Currency = {
	code: 'USD',
	singularLabel: 'Dollar',
	pluralLabel: 'Dollars',
	sign: '$',
	signB4: false,
	decimalPlaces: 2,
	decimalMark: '.',
	thousandsSeparator: ',',
	subunits: 100, // Math.pow(10, 2);
};
