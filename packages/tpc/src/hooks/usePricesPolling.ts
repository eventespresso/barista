import { useEffect } from 'react';

import { useQuery } from '@eventespresso/data';
import { usePrevious } from '@eventespresso/hooks';
import { usePriceQueryOptions } from '@eventespresso/edtr-services';

import usePricesPollInterval from './usePricesPollInterval';

const usePricesPolling = (): void => {
	const { query, ...options } = usePriceQueryOptions();
	const [pollInterval] = usePricesPollInterval();
	const prevPollInterval = usePrevious(pollInterval);

	const { startPolling, stopPolling } = useQuery(query, options);

	useEffect(() => {
		// if poll interval has changed
		if (pollInterval !== prevPollInterval) {
			// if poll interval has been set/changed
			if (pollInterval > 0) {
				// first stop the polling
				stopPolling();
				// start polling with new/fresh value
				startPolling(pollInterval);
			} else {
				// Since poll interval has changed to falsy
				// We need to stop pointing our missiles towards the target
				stopPolling();
			}
		}
		// Make sure we don't leave any traces for our enemy after unmount
		return stopPolling;
	}, [pollInterval, prevPollInterval, startPolling, stopPolling]);
};

export default usePricesPolling;
