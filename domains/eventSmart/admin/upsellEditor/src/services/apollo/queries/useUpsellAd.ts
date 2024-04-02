import { useCacheQuery } from '@eventespresso/data';
import { useMemoStringify } from '@eventespresso/utils';

import { useUpsellAdQueryOptions } from './useUpsellAdQueryOptions';
import type { UpsellAd, UpsellAdData } from '../types';

export const useUpsellAd = (): UpsellAd => {
	const options = useUpsellAdQueryOptions();

	const { data } = useCacheQuery<UpsellAdData>(options);

	return useMemoStringify(data?.espressoUpsellAd);
};
