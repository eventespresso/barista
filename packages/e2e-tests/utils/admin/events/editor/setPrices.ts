import type { TpcPriceModifier } from '@eventespresso/tpc';
import { setPrice } from './setPrice';

export const setPrices = async (prices: Array<TpcPriceModifier>) => {
	for (const price of prices) {
		await setPrice(price);
	}
};
