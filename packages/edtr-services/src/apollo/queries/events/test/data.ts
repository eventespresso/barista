import { GraphQLError } from 'graphql';

import type { Event } from '../../../types';
import { CacheQueryOptions } from '@eventespresso/data';

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
		visibleOn: 'October 21, 2020 1:03 pm',
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
