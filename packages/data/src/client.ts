import { ApolloClient, InMemoryCache, InMemoryCacheConfig, FieldReadFunction } from '@apollo/client';
import type { NormalizedCacheObject } from '@apollo/client';
import { BatchHttpLink } from '@apollo/client/link/batch-http';

const graphqlEndpoint = window?.eventEspressoData?.api?.graphqlEndpoint || '';
const nonce = window?.eventEspressoData?.api?.restApiNonce || '';

const getReadFunction = (type: string): FieldReadFunction => {
	return (_, { args, toReference }) => toReference({ __typename: type, id: args.id });
};

const cacheConfig: InMemoryCacheConfig = {
	typePolicies: {
		Query: {
			fields: {
				datetime: getReadFunction('EspressoDatetime'),
				espressoEvent: getReadFunction('EspressoEvent'),
				ticket: getReadFunction('EspressoTicket'),
				price: getReadFunction('EspressoPrice'),
				priceType: getReadFunction('EspressoPriceType'),
				recurrence: getReadFunction('EspressoRecurrence'),
			},
		},
	},
};

export const cache = new InMemoryCache(cacheConfig);

export const getClient = (): ApolloClient<NormalizedCacheObject> => {
	// add nonce only if exists.
	const headers = nonce
		? {
				'X-WP-Nonce': nonce,
		  }
		: null;

	const link = new BatchHttpLink({
		uri: graphqlEndpoint || '/graphql',
		headers,
	});

	const client = new ApolloClient({
		cache,
		link,
	});

	return client;
};
