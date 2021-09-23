import { gql } from '@eventespresso/data';
import { DATETIME_ATTRIBUTES } from '../../queries/datetimes';

export const CREATE_DATETIME = gql`
	mutation CREATE_DATETIME($input: CreateEspressoDatetimeInput!) {
		createEspressoDatetime(input: $input) {
			espressoDatetime {
				...datetimeAttributes
			}
		}
	}
	${DATETIME_ATTRIBUTES}
`;

export const UPDATE_DATETIME = gql`
	mutation UPDATE_DATETIME($input: UpdateEspressoDatetimeInput!) {
		updateEspressoDatetime(input: $input) {
			espressoDatetime {
				...datetimeAttributes
			}
		}
	}
	${DATETIME_ATTRIBUTES}
`;

export const DELETE_DATETIME = gql`
	mutation DELETE_DATETIME($input: DeleteEspressoDatetimeInput!) {
		deleteEspressoDatetime(input: $input) {
			espressoDatetime {
				...datetimeAttributes
			}
		}
	}
	${DATETIME_ATTRIBUTES}
`;

export const BULK_UPDATE_DATETIMES = gql`
	mutation BULK_UPDATE_DATETIMES($input: BulkUpdateEspressoDatetimeInput!) {
		bulkUpdateEspressoDatetime(input: $input) {
			updated
			failed
		}
	}
`;

export { default as useDatetimeMutator } from './useDatetimeMutator';

export { default as useDeleteRelatedTickets } from './useDeleteRelatedTickets';

export { default as useBulkEditDatetimes } from './useBulkEditDatetimes';

export { default as useBulkDeleteDatetimes } from './useBulkDeleteDatetimes';

export { default as useReorderDatetimes } from './useReorderDatetimes';

export * from './types';
