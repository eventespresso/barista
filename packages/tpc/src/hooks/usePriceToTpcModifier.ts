import { useCallback } from 'react';

import { useRelations } from '@eventespresso/services';
import type { Price } from '@eventespresso/constants';
import { TpcPriceModifier } from '../types';

export type PriceToTpcModifier = (price: Price) => TpcPriceModifier;

const usePriceToTpcModifier = (): PriceToTpcModifier => {
	const { getRelations } = useRelations();

	return useCallback<PriceToTpcModifier>(
		(price) => {
			const priceTypes = getRelations({
				entity: 'prices',
				entityId: price.id,
				relation: 'priceTypes',
			});
			const [priceTypeId] = priceTypes;
			// convert to TPC price objects by adding "priceType"
			return {
				// it's possible that we are already editing a price
				// which will have price type fields set, those will be preferred
				priceType: priceTypeId,
				...price,
			};
		},
		[getRelations]
	);
};

export default usePriceToTpcModifier;
