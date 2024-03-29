import { ApolloClient, InMemoryCache, InMemoryCacheConfig, FieldReadFunction } from '@apollo/client';
import type { NormalizedCacheObject } from '@apollo/client';
import { BatchHttpLink } from '@apollo/client/link/batch-http';

const graphqlEndpoint = window?.eventEspressoData?.api?.graphqlEndpoint || '/graphql';
const nonce = window?.eventEspressoData?.api?.restApiNonce || '';

const getReadFunction = (type: string): FieldReadFunction => {
	return (_, { args, toReference }) => toReference({ __typename: type, id: args.id });
};

const cacheConfig: InMemoryCacheConfig = {
	typePolicies: {
		Query: {
			fields: {
				espressoDatetime: getReadFunction('EspressoDatetime'),
				espressoEvent: getReadFunction('EspressoEvent'),
				espressoTicket: getReadFunction('EspressoTicket'),
				espressoPrice: getReadFunction('EspressoPrice'),
				espressoPriceType: getReadFunction('EspressoPriceType'),
				espressoRecurrence: getReadFunction('EspressoRecurrence'),
			},
		},
	},
};

export const cache = new InMemoryCache(cacheConfig);

export const getClient = (): ApolloClient<NormalizedCacheObject> => {
	// add nonce only if exists.
	const headers = nonce
		? {
				// 'X-WP-Nonce' is used by WP GraphQL to authenticate the user.
				'X-WP-Nonce': nonce,
		  }
		: null;

	const link = new BatchHttpLink({
		uri: graphqlEndpoint,
		headers,
	});

	const client = new ApolloClient({
		cache,
		link,
	});

	return client;
};
