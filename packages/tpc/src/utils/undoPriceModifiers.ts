import { parsedAmount } from '@eventespresso/utils';
import { TpcPriceModifier } from '../types';

const undoPriceModifiers = (subTotal: number, modifiers: Array<TpcPriceModifier>): number => {
	const modifications = modifiers.reduce(
		({ percents, fixedPrices }, { amount, isDiscount, isPercent }) => {
			const priceAmount = parsedAmount(amount) || 0;

			const newAmount = isDiscount ? -priceAmount : priceAmount;

			return isPercent
				? {
						fixedPrices,
						percents: percents + newAmount,
				  }
				: {
						fixedPrices: fixedPrices + newAmount,
						percents,
				  };
		},
		{
			percents: 0,
			fixedPrices: 0,
		}
	);

	// Lets first adjust the fixed price modifications
	const newSubTotal = subTotal - modifications.fixedPrices;

	// finally we can adjust the percents
	return newSubTotal / (1 + modifications.percents / 100);
};

export default undoPriceModifiers;
