import { GraphQLError } from 'graphql';

import type { Viewer, CurrentUserProps } from '@eventespresso/services';
import type { ReadQueryOptions } from '../../types';
import { GET_CURRENT_USER } from '..';

export const request: ReadQueryOptions = {
	query: GET_CURRENT_USER,
};

export const currentUser: CurrentUserProps = {
	description: null,
	email: 'user@eventespresso.com',
	firstName: null,
	id: 'dXNlcjox',
	name: 'admin',
	nicename: 'admin',
	nickname: 'admin',
	lastName: null,
	locale: 'en_US',
	databaseId: 1,
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
