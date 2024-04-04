import { TpcPriceModifier } from '../types';
import type { Price } from '@eventespresso/constants';
import { usePriceTypeForPrice } from '@eventespresso/edtr-services';
import { useMemo } from 'react';

const usePriceModifier = (price: Price): TpcPriceModifier => {
	const priceType = usePriceTypeForPrice(price.id);
	return useMemo(
		() => ({
			...price,
			priceType: priceType?.id,
		}),
		[price, priceType?.id]
	);
};

export default usePriceModifier;
