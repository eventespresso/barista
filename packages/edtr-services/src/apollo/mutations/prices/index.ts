import { gql } from '@eventespresso/data';
import { PRICE_ATTRIBUTES } from '../../queries/prices';

export const CREATE_PRICE = gql`
	mutation CREATE_PRICE($input: CreateEspressoPriceInput!) {
		createEspressoPrice(input: $input) {
			espressoPrice {
				...priceAttributes
			}
		}
	}
	${PRICE_ATTRIBUTES}
`;

export const UPDATE_PRICE = gql`
	mutation UPDATE_PRICE($input: UpdateEspressoPriceInput!) {
		updateEspressoPrice(input: $input) {
			espressoPrice {
				...priceAttributes
			}
		}
	}
	${PRICE_ATTRIBUTES}
`;

export const DELETE_PRICE = gql`
	mutation DELETE_PRICE($input: DeleteEspressoPriceInput!) {
		deleteEspressoPrice(input: $input) {
			espressoPrice {
				id
			}
		}
	}
`;

export { default as usePriceMutator } from './usePriceMutator';

export { default as useBulkDeletePrices } from './useBulkDeletePrices';

export * from './types';
