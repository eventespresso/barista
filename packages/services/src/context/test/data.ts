import { GET_CURRENT_USER, GET_GENERAL_SETTINGS } from '@eventespresso/data';
import type { MockedResponse } from '@eventespresso/edtr-services/src/context/test/types';
import { test as configTest } from '@eventespresso/config';

export const configMocks: ReadonlyArray<MockedResponse> = [
	{
		request: {
			query: GET_CURRENT_USER,
			variables: {},
		},
		result: {
			data: {
				viewer: configTest.mockData.config.currentUser,
			},
		},
	},
	{
		request: {
			query: GET_GENERAL_SETTINGS,
			variables: {},
		},
		result: {
			data: {
				generalSettings: configTest.mockData.config.generalSettings,
			},
		},
	},
];
