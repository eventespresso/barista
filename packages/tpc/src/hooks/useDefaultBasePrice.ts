import { useMemo } from 'react';

import { useMemoStringify } from '@eventespresso/utils';
import { usePriceTypes } from '@eventespresso/edtr-services';
import { isBasePrice } from '@eventespresso/predicates';
import defaultPrice from '../defaultPriceModifier';
import { updatePriceModifier } from '../utils';
import { usePriceModifier } from '../hooks';
import { TpcPriceModifier } from '../types';

const useDefaultBasePrice = (createNewDefault = false): TpcPriceModifier => {
	const allPriceTypes = usePriceTypes();

	const [basePriceType] = useMemo(() => {
		return allPriceTypes.filter(isBasePrice);
	}, [allPriceTypes]);

	if (createNewDefault) {
		defaultPrice.isDefault = true;
	}
	const defaultPriceModifier = usePriceModifier(defaultPrice);
	const basePrice = useMemo(
		() => updatePriceModifier(defaultPriceModifier, basePriceType),
		[basePriceType, defaultPriceModifier]
	);

	return useMemoStringify(basePrice);
};

export default useDefaultBasePrice;
