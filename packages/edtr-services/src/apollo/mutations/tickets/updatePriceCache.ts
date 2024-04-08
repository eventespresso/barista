import { assocPath, pathOr, uniqBy, sortBy, identity } from 'ramda';

import type { CacheUpdaterFnArgs } from '../types';
import { DEFAULT_PRICE_LIST_DATA, GET_PRICES } from '../../queries';
import type { PricesList } from '../../types';
import type { CacheQueryOptions, WriteQueryOptions } from '@eventespresso/data';
import { entityDbId } from '@eventespresso/predicates';
import type { Price } from '@eventespresso/constants';

const updatePriceCache = ({ cache, prices = null, ticketIn, ticketId, action }: CacheUpdaterFnArgs): void => {
	const queryOptions: CacheQueryOptions = {
		query: GET_PRICES,
		variables: {
			where: {
				ticketIn: sortBy(identity, ticketIn),
				includeDefaultPrices: true,
			},
		},
	};
	let data: PricesList;
	// Read the existing data from cache.
	try {
		data = cache.readQuery<PricesList>(queryOptions);
	} catch (error) {
		// do nothing with the error
	}

	// if there is no data, make sure GQL type is properly set.
	if (!data?.espressoPrices) {
		data = {
			espressoPrices: DEFAULT_PRICE_LIST_DATA,
		};
	}

	let newTicketIn: typeof ticketIn;

	switch (action) {
		case 'add':
			newTicketIn = [...ticketIn, ticketId];
			break;
		case 'remove':
			newTicketIn = ticketIn.filter((id) => id !== ticketId);
			break;
		default:
			newTicketIn = ticketIn;
			break;
	}

	const priceNodes = prices?.nodes || [];
	const pathToNodes = ['espressoPrices', 'nodes'];

	if (action === 'add' && priceNodes.length) {
		const existingPrices = pathOr<Price[]>([], pathToNodes, data);
		// make sure that default prices are not repeated
		const newPrices = uniqBy(entityDbId, [...existingPrices, ...priceNodes]);
		data = assocPath<Price[], PricesList>(pathToNodes, newPrices, data);
	}
	const nodes = pathOr<Price[]>([], pathToNodes, data);
	// if there are no prices
	if (!nodes.length) {
		return;
	}

	// write the data to cache without
	// mutating the cache directly
	const writeOptions: WriteQueryOptions = {
		query: GET_PRICES,
		data,
		variables: {
			where: {
				ticketIn: sortBy(identity, newTicketIn),
				includeDefaultPrices: true,
			},
		},
	};
	cache.writeQuery<PricesList>(writeOptions);
};

export default updatePriceCache;
