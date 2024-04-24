import { GraphQLError } from 'graphql';

import { CacheQueryOptions } from '@eventespresso/data';

import type { Event } from '@eventespresso/constants';

export const request: CacheQueryOptions = null; // to be generated via Query Options hook

export const nodes: Event[] = [
	{
		id: 'xyz',
		dbId: 100,
		cacheId: '',
		allowDonations: false,
		allowOverflow: false,
		altRegPage: '',
		created: 'October 21, 2020 5:03 pm',
		description: 'Test',
		defaultRegStatus: '',
		displayDescription: false,
		displayTicketSelector: true,
		isActive: true,
		isCancelled: false,
		isExpired: false,
		isInactive: false,
		isPostponed: false,
		isSoldOut: false,
		isUpcoming: false,
		manager: {
			id: 'test',
			name: 'Test',
		},
		maxRegistrations: 10,
		memberOnly: false,
		name: 'Hello',
		order: 1,
		phoneNumber: '',
		shortDescription: 'short',
		status: 'publish',
		timezoneString: '',
		venue: '',
		__typename: 'EspressoEvent',
	},
];

export const data = {
	espressoEvent: nodes[0],
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
