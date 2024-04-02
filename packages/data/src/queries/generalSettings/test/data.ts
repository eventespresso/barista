import { GraphQLError } from 'graphql';

import type { GeneralSettingsData } from '@eventespresso/config';
import { GET_GENERAL_SETTINGS } from '..';
import type { CacheQueryOptions } from '../../types';

export const request: CacheQueryOptions = {
	query: GET_GENERAL_SETTINGS,
};

export const generalSettings = {
	dateFormat: 'F j, Y',
	timeFormat: 'g:i a',
	timezone: 'Asia/Kolkata',
	__typename: 'GeneralSettings',
};

export const data: GeneralSettingsData = {
	generalSettings,
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
