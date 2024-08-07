import { gql } from '@eventespresso/data';

export const DATETIME_ATTRIBUTES: any = gql`
	fragment datetimeAttributes on EspressoDatetime {
		id
		dbId
		cacheId
		capacity
		description
		endDate
		isActive
		isExpired
		isPrimary
		isSoldOut
		isTrashed
		isUpcoming
		length
		name
		order
		reserved
		sold
		status
		startDate
		venue
	}
`;

export const GET_DATETIME: any = gql`
	query GET_DATETIME($id: ID!) {
		espressoDatetime(id: $id) {
			...datetimeAttributes
		}
	}
	${DATETIME_ATTRIBUTES}
`;

export const GET_DATETIMES: any = gql`
	query GET_DATETIMES($where: EspressoRootQueryDatetimesConnectionWhereArgs) {
		espressoDatetimes(where: $where) {
			nodes {
				...datetimeAttributes
			}
		}
	}
	${DATETIME_ATTRIBUTES}
`;
