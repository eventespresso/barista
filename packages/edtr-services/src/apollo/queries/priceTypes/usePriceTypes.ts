import { useCacheQuery } from '@eventespresso/data';
import { useMemoStringify } from '@eventespresso/utils';
import usePriceTypeQueryOptions from './usePriceTypeQueryOptions';
import { getCacheIds } from '@eventespresso/predicates';
import type { PriceType } from '@eventespresso/constants';
import type { PriceTypesList } from '../../types';

/**
 * A custom react hook for retrieving all the priceTypes from cache
 */
const usePriceTypes = (): PriceType[] => {
	const options = usePriceTypeQueryOptions();
	const { data } = useCacheQuery<PriceTypesList>(options);

	const nodes = data?.espressoPriceTypes?.nodes || [];

	const cacheIds = getCacheIds(nodes);

	return useMemoStringify(nodes, cacheIds);
};

export default usePriceTypes;
