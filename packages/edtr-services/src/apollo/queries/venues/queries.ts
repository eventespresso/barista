import { gql } from '@eventespresso/data';

export const VENUE_ATTRIBUTES: any = gql`
	fragment venueAttributes on EspressoVenue {
		id
		address
		address2
		cacheId
		city
		countryName
		dbId
		name
		stateName
		thumbnail
		zip
	}
`;

export const GET_VENUE: any = gql`
	query GET_VENUE($id: ID!) {
		venue(id: $id) {
			...venueAttributes
		}
	}
	${VENUE_ATTRIBUTES}
`;

export const GET_VENUES: any = gql`
	query GET_VENUES($where: RootQueryToEspressoVenueConnectionWhereArgs) {
		espressoVenues(where: $where) {
			nodes {
				...venueAttributes
			}
		}
	}
	${VENUE_ATTRIBUTES}
`;
