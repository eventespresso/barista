import { GraphQLError } from 'graphql';

import { GET_CURRENT_USER } from '..';
import type { Viewer, User } from '../types';
import type { CacheQueryOptions } from '../../types';

export const request: CacheQueryOptions = {
	query: GET_CURRENT_USER,
};

export const currentUser: User = {
	id: 'dXNlcjox',
	capabilities: [],
	description: null,
	email: 'user@eventespresso.com',
	firstName: null,
	isa: false,
	lastName: null,
	locale: 'en_US',
	name: 'admin',
	nicename: 'admin',
	nickname: 'admin',
	roles: ['administrator'],
	username: 'admin',
	__typename: 'User',
};

export const data: Viewer = {
	viewer: currentUser,
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
