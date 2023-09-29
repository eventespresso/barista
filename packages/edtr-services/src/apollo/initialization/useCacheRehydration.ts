import { useEffect } from 'react';

import { useRelations, useStatus, TypeName } from '@eventespresso/services';
import {
	useCurrentUserQueryOptions,
	useGeneralSettingsQueryOptions,
	useUpdateCache,
	useUpdateCurrentUserCache,
	useUpdateGeneralSettingsCache,
	useIsRehydrated,
} from '@eventespresso/data';

import useCacheRehydrationData from './useCacheRehydrationData';
import {
	useUpdateDatetimeList,
	useUpdatePriceList,
	useUpdatePriceTypeList,
	useUpdateTicketList,
	useUpdateVenueList,
} from '../../hooks';
import {
	DEFAULT_DATETIME_LIST_DATA,
	DEFAULT_TICKET_LIST_DATA,
	DEFAULT_PRICE_LIST_DATA,
	DEFAULT_PRICE_TYPE_LIST_DATA,
	DEFAULT_VENUE_LIST_DATA,
	useDatetimeQueryOptions,
	useEventQueryOptions,
	usePriceQueryOptions,
	usePriceTypeQueryOptions,
	useTicketQueryOptions,
	useVenueQueryOptions,
} from '../queries';

const useCacheRehydration = (): boolean => {
	const { setIsLoaded } = useStatus();
	const { initialize: initializeRelations, isInitialized: relationsInitialized } = useRelations();
	const { currentUser, eventEditor, generalSettings } = useCacheRehydrationData();
	const [isRehydrated, setIsRehydrated] = useIsRehydrated();
	const {
		event,
		datetimes: espressoDatetimes = DEFAULT_DATETIME_LIST_DATA,
		tickets: espressoTickets = DEFAULT_TICKET_LIST_DATA,
		prices: espressoPrices = DEFAULT_PRICE_LIST_DATA,
		priceTypes: espressoPriceTypes = DEFAULT_PRICE_TYPE_LIST_DATA,
		venues: espressoVenues = DEFAULT_VENUE_LIST_DATA,
		relations,
	} = eventEditor;

	const priceTypeQueryOptions = usePriceTypeQueryOptions();
	const updatePriceTypeList = useUpdatePriceTypeList();

	const datetimeQueryOptions = useDatetimeQueryOptions();
	const updateDatetimeList = useUpdateDatetimeList();

	const ticketQueryOptions = useTicketQueryOptions();
	const updateTicketList = useUpdateTicketList();

	const priceQueryOptions = usePriceQueryOptions();
	const updatePriceList = useUpdatePriceList();

	const venueQueryOptions = useVenueQueryOptions();
	const updateVenueList = useUpdateVenueList();

	const currentUserQueryOptions = useCurrentUserQueryOptions();
	const updateCurrentUser = useUpdateCurrentUserCache();

	const generalSettingsQueryOptions = useGeneralSettingsQueryOptions();
	const updateGeneralSettings = useUpdateGeneralSettingsCache();

	const eventQueryOptions = useEventQueryOptions();
	const updateCache = useUpdateCache();

	useEffect(() => {
		if (!relationsInitialized()) {
			/* Rehydrate relations */
			initializeRelations(relations);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [relations]);

	useEffect(() => {
		if (isRehydrated) {
			return;
		}

		/* Rehydrate event data */
		updateCache({
			...eventQueryOptions,
			data: {
				espressoEvent: event,
			},
		});
		/* Rehydrate price types */
		updatePriceTypeList({
			...priceTypeQueryOptions,
			data: {
				espressoPriceTypes,
			},
		});
		setIsLoaded(TypeName.priceTypes, true);

		/* Rehydrate datetimes */
		updateDatetimeList({
			...datetimeQueryOptions,
			data: {
				espressoDatetimes,
			},
		});
		setIsLoaded(TypeName.datetimes, true);

		/* Rehydrate tickets */
		updateTicketList({
			...ticketQueryOptions,
			data: {
				espressoTickets,
			},
		});
		setIsLoaded(TypeName.tickets, true);

		/* Rehydrate prices */
		updatePriceList({
			...priceQueryOptions,
			data: {
				espressoPrices,
			},
		});
		setIsLoaded(TypeName.prices, true);

		/* Rehydrate venues */
		updateVenueList({
			...venueQueryOptions,
			data: {
				espressoVenues,
			},
		});

		/* Rehydrate current user */
		updateCurrentUser({
			...currentUserQueryOptions,
			data: {
				viewer: currentUser,
			},
		});

		/* Rehydrate general settings */
		updateGeneralSettings({
			...generalSettingsQueryOptions,
			data: {
				generalSettings,
			},
		});

		setIsRehydrated(true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return isRehydrated;
};

export default useCacheRehydration;
