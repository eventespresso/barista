import { getDefaultPriceModifierType } from '@eventespresso/predicates';
import { useMemoStringify } from '@eventespresso/hooks';
import usePriceTypes from './usePriceTypes';
import type { PriceType } from '../../types';

/**
 * A custom react hook for retrieving the default price type object.
 */
const useDefaultPriceType = (): PriceType | null => {
	const allPriceTypes = usePriceTypes();
	const defaultPriceType: PriceType | null = getDefaultPriceModifierType(allPriceTypes);
	return useMemoStringify(defaultPriceType);
};

export default useDefaultPriceType;
