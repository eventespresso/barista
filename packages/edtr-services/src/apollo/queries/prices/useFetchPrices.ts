import { useEffect, useRef } from 'react';
import { useQuery } from '@eventespresso/data';
import { __ } from '@wordpress/i18n';

import { useStatus, TypeName } from '@eventespresso/services';
import { useSystemNotifications } from '@eventespresso/toaster';
import usePriceQueryOptions from './usePriceQueryOptions';
import { FetchQueryResult } from '@eventespresso/data';
import type { PricesList } from '../../types';

const useFetchPrices = (skipFetch: boolean = null): FetchQueryResult<PricesList> => {
	const { setIsLoading, setIsLoaded, setIsError, isLoaded } = useStatus();
	const { query, ...options } = usePriceQueryOptions();

	const { ticketIn } = options.variables.where;
	// do not fetch if we don't have any tickets
	// or prices have already been fetched
	const skip = skipFetch !== null ? skipFetch : !ticketIn.length || isLoaded(TypeName.prices);

	const toaster = useSystemNotifications();
	const toastId = useRef(null);

	const dismissLoading = (): void => toaster.dismiss(toastId.current);

	const { loading, ...result } = useQuery<PricesList>(query, {
		...options,
		skip,
		onCompleted: (): void => {
			setIsLoaded(TypeName.prices, true);
			dismissLoading();
			toaster.success({ message: __('prices initialized') });
		},
		onError: (error): void => {
			setIsError(TypeName.prices, true);
			dismissLoading();
			toaster.error({ message: error.message });
		},
	});

	useEffect(() => {
		if (loading) {
			toastId.current = toaster.loading({ message: __('initializing prices') });
		}

		setIsLoading(TypeName.prices, loading);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loading]);

	return {
		...result,
		loading,
	};
};

export default useFetchPrices;
