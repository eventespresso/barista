import gql from 'graphql-tag';

import type { FetchQueryResult } from '@eventespresso/data';
import { useEventsQuery } from '@eventespresso/data';
import type { EventsList } from '../types';

export const GET_EVENTS: any = gql`
	query GET_EVENTS($first: Int) {
		espressoEvents(first: $first) {
			nodes {
				id
				dbId
				name
			}
		}
	}
`;

const useEvents = (): FetchQueryResult<EventsList> => {
	return useEventsQuery({
		query: GET_EVENTS,
		variables: {
			first: 100,
		},
		fetchPolicy: 'cache-first',
	});
};

export default useEvents;
