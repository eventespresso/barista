import { GraphQLError } from 'graphql';
import { formatISO } from 'date-fns';

import type { Datetime } from '@eventespresso/constants';
import { DateStatus } from '@eventespresso/constants';
import { CacheQueryOptions } from '@eventespresso/data';
import type { DatetimeEdge } from '../../../types';

export const request: CacheQueryOptions = null; // to be generated via Query Options hook

export const nodes: Datetime[] = [
	{
		id: 'xyz',
		dbId: 2,
		cacheId: '',
		capacity: 40,
		name: 'Hello',
		description: 'Test',
		endDate: 'some',
		isActive: true,
		isExpired: false,
		isPrimary: false,
		isSoldOut: false,
		isTrashed: false,
		isUpcoming: false,
		status: DateStatus.active,
		length: 0,
		order: 0,
		reserved: 0,
		sold: 6,
		startDate: formatISO(new Date(1987, 1, 11)),
		venue: '',
		__typename: 'EspressoDatetime',
	},
	{
		id: 'abc',
		dbId: 3,
		cacheId: '',
		capacity: 100,
		name: 'Hello World',
		description: 'Test Desc',
		endDate: 'some dat',
		isActive: false,
		isExpired: true,
		isPrimary: false,
		isSoldOut: false,
		isTrashed: false,
		isUpcoming: false,
		status: DateStatus.expired,
		length: 0,
		order: 10,
		reserved: 0,
		sold: 10,
		startDate: formatISO(new Date(1986, 1, 11)),
		venue: '',
		__typename: 'EspressoDatetime',
	},
	{
		id: 'def',
		dbId: 4,
		cacheId: '',
		capacity: 420,
		name: 'Hello World',
		description: 'Test Desc',
		endDate: 'some dat',
		isActive: false,
		isExpired: true,
		isPrimary: false,
		isSoldOut: false,
		isTrashed: false,
		isUpcoming: false,
		status: DateStatus.expired,
		length: 0,
		order: 5,
		reserved: 0,
		sold: 42,
		startDate: formatISO(new Date(1985, 1, 11)),
		venue: '',
		__typename: 'EspressoDatetime',
	},
];

export const edge: DatetimeEdge = {
	nodes,
	__typename: 'EspressoRootQueryDatetimesConnection',
};

export const data = {
	espressoDatetimes: edge,
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
