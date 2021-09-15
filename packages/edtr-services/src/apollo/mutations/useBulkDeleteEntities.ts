import { useCallback } from 'react';
import { useMutationWithFeedback, gql, MutationType } from '@eventespresso/data';
import type { ExecutionResult } from 'graphql';

import type { EntityId } from '@eventespresso/data';

interface BulkDeleteEntitiesProps {
	entityType: 'DATETIME' | 'TICKET' | 'PRICE';
	typeName: string;
}

interface CallbackArgs {
	entityIds: Array<EntityId>;
	deletePermanently?: boolean;
	updateEntityList: VoidFunction;
}

type Callback = (args: CallbackArgs) => Promise<ExecutionResult>;

const BULK_DELETE_ENTITIES = gql`
	mutation BULK_DELETE_ENTITIES($input: BulkDeleteEspressoEntitiesInput!) {
		bulkDeleteEspressoEntities(input: $input) {
			deleted
			failed
		}
	}
`;

const useBulkDeleteEntities = ({ entityType, typeName }: BulkDeleteEntitiesProps): Callback => {
	const bulkDelete = useMutationWithFeedback({
		typeName,
		mutationType: MutationType.Delete,
		mutation: BULK_DELETE_ENTITIES,
	});

	return useCallback<Callback>(
		async ({ entityIds, deletePermanently, updateEntityList }) => {
			return await bulkDelete({
				variables: {
					input: {
						clientMutationId: 'BULK_DELETE_ENTITIES',
						entityIds,
						entityType,
						deletePermanently,
					},
				},
				update: updateEntityList,
			});
		},
		[bulkDelete, entityType]
	);
};

export default useBulkDeleteEntities;
