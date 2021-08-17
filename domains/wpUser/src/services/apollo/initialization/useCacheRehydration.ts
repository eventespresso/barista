import { useEffect, useRef } from 'react';

import { useIsRehydrated } from '@eventespresso/data';
import { useTicketsMeta } from '@eventespresso/edtr-services';

import useCacheRehydrationData from './useCacheRehydrationData';

/**
 * Returns true if the cache has been rehydrated, false otherwise
 */
const useCacheRehydration = (): boolean => {
	const [isRehydrated] = useIsRehydrated();

	const { ticketMeta } = useCacheRehydrationData();

	const { mergeMetaMap } = useTicketsMeta();

	const initialized = useRef(false);

	useEffect(() => {
		// Make sure this rehydration happens after core
		if (initialized.current || !isRehydrated) {
			return;
		}
		// it's possible that other addons may add their meta,
		// so we will merge it instead of resetting it
		mergeMetaMap(ticketMeta);

		// switch the flag
		initialized.current = true;
	}, [isRehydrated, mergeMetaMap, ticketMeta]);

	return initialized.current;
};

export default useCacheRehydration;
