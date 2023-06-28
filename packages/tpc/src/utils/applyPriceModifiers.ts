import { parsedAmount } from '@eventespresso/utils';
import { TpcPriceModifier } from '../types';

const applyPriceModifiers = (baseAmount: number, modifiers: Array<TpcPriceModifier>): number => {
	const modifications = modifiers.reduce((prevValue, { amount, isDiscount, isPercent }) => {
		const priceAmount = parsedAmount(amount);

		// calculate the modification value
		const modification = isPercent ? (priceAmount / 100) * baseAmount : priceAmount;

		if (isDiscount) {
			// subtract the modification from previous value
			return prevValue - modification;
		}
		// add the modification to the previous value
		return prevValue + modification;
	}, 0);

	// Add all the modifications to the base amount
	return baseAmount + modifications;
};

export default applyPriceModifiers;
