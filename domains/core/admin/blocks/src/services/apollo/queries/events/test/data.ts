import { GraphQLError } from 'graphql';

import { CacheQueryOptions } from '@eventespresso/data';
import { Event, EventEdge } from '@blocksServices/apollo/types';

export const request: CacheQueryOptions = null; // to be set dynamically

export const nodes: Event[] = [
	{
		id: 'event-abc',
		dbId: 1,
		cacheId: '',
		description: '',
		shortDescription: '',
		name: 'Event ABC',
		__typename: 'EspressoEvent',
	},
	{
		id: 'event-def',
		dbId: 2,
		cacheId: '',
		description: '',
		shortDescription: '',
		name: 'Event DEF',
		__typename: 'EspressoEvent',
	},
	{
		id: 'event-pqr',
		dbId: 3,
		description: '',
		shortDescription: '',
		cacheId: '',
		name: 'Event PQR',
		__typename: 'EspressoEvent',
	},
];

export const edge: EventEdge = {
	nodes,
	__typename: 'RootQueryToEspressoEventConnection',
};

export const data = {
	espressoEvents: edge,
};

const errors = [new GraphQLError('Error!')];

export const successMocks = [
	{
		request,
		result: { data },
	},
];

export const errorMocks = [
	{
		// modify request to simulate error
		request: {
			...request,
			variables: {},
		},
		result: { errors },
		error: new Error('ERROR!'),
	},
];
