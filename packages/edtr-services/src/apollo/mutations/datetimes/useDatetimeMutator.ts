import { useCallback, useMemo } from 'react';

import { MutationType, useMutationWithFeedback } from '@eventespresso/data';

import type { DatetimeMutator } from './types';
import { CREATE_DATETIME, UPDATE_DATETIME, DELETE_DATETIME } from './';
import useMutationHandler from './useMutationHandler';
import useUpdateCallback from '../useUpdateCallback';
import { TypeName } from '../types';
import { SINGULAR_ENTITY_NAME } from '../../../constants';

type DM = DatetimeMutator;

const useDatetimeMutator = (id = ''): DM => {
	const createDatetime = useMutationWithFeedback({
		typeName: SINGULAR_ENTITY_NAME.DATETIME,
		mutationType: MutationType.Create,
		mutation: CREATE_DATETIME,
	});

	const updateDatetime = useMutationWithFeedback({
		typeName: SINGULAR_ENTITY_NAME.DATETIME,
		mutationType: MutationType.Update,
		mutation: UPDATE_DATETIME,
	});

	const deleteDatetime = useMutationWithFeedback({
		typeName: SINGULAR_ENTITY_NAME.DATETIME,
		mutationType: MutationType.Delete,
		mutation: DELETE_DATETIME,
	});

	const mutationHandler = useMutationHandler();

	const getUpdateCallback = useUpdateCallback(TypeName.Datetime);

	const createEntity = useCallback<DM['createEntity']>(
		(input) => {
			const { onUpdate, ...options } = mutationHandler(MutationType.Create, input);

			const update = getUpdateCallback({ onUpdate, mutationType: MutationType.Create, input });

			return createDatetime({ ...options, update });
		},
		[createDatetime, getUpdateCallback, mutationHandler]
	);

	const updateEntity = useCallback<DM['updateEntity']>(
		(input) => {
			const { onUpdate, ...options } = mutationHandler(MutationType.Update, { id, ...input });

			const update = getUpdateCallback({ onUpdate, mutationType: MutationType.Update, input });

			return updateDatetime({ ...options, update });
		},
		[getUpdateCallback, id, mutationHandler, updateDatetime]
	);

	const deleteEntity = useCallback<DM['deleteEntity']>(
		(input) => {
			const { onUpdate, ...options } = mutationHandler(MutationType.Delete, { id, ...input });

			const update = getUpdateCallback({ onUpdate, mutationType: MutationType.Delete, input });

			return deleteDatetime({ ...options, update });
		},
		[deleteDatetime, getUpdateCallback, id, mutationHandler]
	);
	return useMemo(() => ({ createEntity, updateEntity, deleteEntity }), [createEntity, deleteEntity, updateEntity]);
};

export default useDatetimeMutator;
