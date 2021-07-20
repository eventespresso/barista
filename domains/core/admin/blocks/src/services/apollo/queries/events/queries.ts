import { gql } from '@eventespresso/data';

export const EVENT_ATTRIBUTES: any = gql`
	fragment blocksEventAttributes on EspressoEvent {
		cacheId
		dbId
		description
		id
		name
		shortDescription
	}
`;

export const GET_EVENTS: any = gql`
	query GET_EVENTS($first: Int) {
		espressoEvents(first: $first) {
			nodes {
				...blocksEventAttributes
			}
		}
	}
	${EVENT_ATTRIBUTES}
`;

export const GET_EVENT: any = gql`
	query GET_EVENT($id: ID!) {
		espressoEvent(id: $id) {
			...blocksEventAttributes
		}
	}
	${EVENT_ATTRIBUTES}
`;
