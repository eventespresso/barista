import { gql } from '@eventespresso/data';

export const RECURRENCE_ATTRIBUTES: any = gql`
	fragment recurrenceAttributes on EspressoRecurrence {
		id
		dbId
		cacheId
		dateDuration
		exDates
		exRule
		name
		rDates
		rRule
	}
`;

export const GET_RECURRENCE: any = gql`
	query GET_RECURRENCE($id: ID!) {
		espressoRecurrence(id: $id) {
			...recurrenceAttributes
		}
	}
	${RECURRENCE_ATTRIBUTES}
`;

export const GET_RECURRENCES: any = gql`
	query GET_RECURRENCES($where: EspressoRootQueryRecurrencesConnectionWhereArgs) {
		espressoRecurrences(where: $where) {
			nodes {
				...recurrenceAttributes
			}
		}
	}
	${RECURRENCE_ATTRIBUTES}
`;
