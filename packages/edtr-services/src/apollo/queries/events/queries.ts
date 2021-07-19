import { gql } from '@eventespresso/data';

export const EVENT_ATTRIBUTES: any = gql`
	fragment eventAttributes on EspressoEvent {
		id
		dbId
		cacheId
		allowDonations
		allowOverflow
		altRegPage
		created
		defaultRegStatus
		description
		displayDescription
		displayTicketSelector
		isActive
		isCancelled
		isExpired
		isInactive
		isPostponed
		isSoldOut
		isUpcoming
		manager {
			id
			name
		}
		maxRegistrations
		memberOnly
		name
		order
		phoneNumber
		shortDescription
		status
		timezoneString
		venue
		visibleOn
	}
`;

export const GET_EVENT: any = gql`
	query GET_EVENT($id: ID!) {
		espressoEvent(id: $id, idType: DATABASE_ID) {
			...eventAttributes
		}
	}
	${EVENT_ATTRIBUTES}
`;
