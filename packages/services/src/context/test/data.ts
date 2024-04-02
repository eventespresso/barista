import { GET_CURRENT_USER, GET_GENERAL_SETTINGS } from '@eventespresso/data';
import type { MockedResponse } from '@eventespresso/edtr-services/src/context/test/types';
import { mockEspressoDomData } from '@eventespresso/config/src/test/data';

export const configMocks: ReadonlyArray<MockedResponse> = [
	{
		request: {
			query: GET_CURRENT_USER,
			variables: {},
		},
		result: {
			data: {
				viewer: mockEspressoDomData.config.currentUser,
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
				generalSettings: mockEspressoDomData.config.generalSettings,
			},
		},
	},
];
