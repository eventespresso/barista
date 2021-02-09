import { parsedAmount } from '@eventespresso/utils';
import { TpcPriceModifier } from '../types';

const applyParallelModifiers = (baseAmount: number, modifiers: Array<TpcPriceModifier>): number => {
	const modifications = modifiers.reduce((prevValue, { amount, isDiscount, isPercent }) => {
		const priceAmount = parsedAmount(amount) || 0;

		// calculate the modification value
		let modification = isPercent ? (priceAmount / 100) * baseAmount : priceAmount;
		// whether we want to add or subtract
		modification = isDiscount ? -modification : modification;

		// add the modification to the previous value
		return prevValue + modification;
	}, 0);

	// Add all the modifications to the base amount
	return baseAmount + modifications;
};

export default applyParallelModifiers;
