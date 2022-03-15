import { gql } from '@apollo/client';

export const GET_CURRENT_USER: any = gql`
	query GET_CURRENT_USER {
		viewer {
			id
			capabilities
			description
			email
			firstName
			isa
			lastName
			locale
			name
			nicename
			nickname
			roles
			username
		}
	}
`;
