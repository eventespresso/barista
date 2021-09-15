import { useCallback, useMemo } from 'react';

import { MutationType, MutationFunction, useMutationWithFeedback } from '@eventespresso/data';

import { TypeName } from '../types';
import { CREATE_PRICE, UPDATE_PRICE, DELETE_PRICE } from './';
import useMutationHandler from './useMutationHandler';
import useUpdateCallback from '../useUpdateCallback';
import type { CreatePriceInput, UpdatePriceInput, DeletePriceInput } from './types';
import type { CreatePriceResult, UpdatePriceResult, DeletePriceResult } from './types';
import { SINGULAR_ENTITY_NAME } from '../../../constants';

interface PriceMutator {
	createEntity: MutationFunction<CreatePriceResult, CreatePriceInput>;
	updateEntity: MutationFunction<UpdatePriceResult, UpdatePriceInput>;
	deleteEntity: MutationFunction<DeletePriceResult, DeletePriceInput>;
}

type PM = PriceMutator;

const usePriceMutator = (id = ''): PM => {
	const createPrice = useMutationWithFeedback({
		typeName: SINGULAR_ENTITY_NAME.PRICE,
		mutationType: MutationType.Create,
		mutation: CREATE_PRICE,
	});

	const updatePrice = useMutationWithFeedback({
		typeName: SINGULAR_ENTITY_NAME.PRICE,
		mutationType: MutationType.Update,
		mutation: UPDATE_PRICE,
	});

	const deletePrice = useMutationWithFeedback({
		typeName: SINGULAR_ENTITY_NAME.PRICE,
		mutationType: MutationType.Delete,
		mutation: DELETE_PRICE,
	});

	const mutationHandler = useMutationHandler();

	const getUpdateCallback = useUpdateCallback(TypeName.Price);

	const createEntity = useCallback<PM['createEntity']>(
		(input) => {
			const { onUpdate, ...options } = mutationHandler(MutationType.Create, input);

			const update = getUpdateCallback({ onUpdate, mutationType: MutationType.Create, input });

			return createPrice({ ...options, update });
		},
		[createPrice, getUpdateCallback, mutationHandler]
	);

	const updateEntity = useCallback<PM['updateEntity']>(
		(input) => {
			const { onUpdate, ...options } = mutationHandler(MutationType.Update, { id, ...input });

			const update = getUpdateCallback({ onUpdate, mutationType: MutationType.Update, input });

			return updatePrice({ ...options, update });
		},
		[getUpdateCallback, id, mutationHandler, updatePrice]
	);

	const deleteEntity = useCallback<PM['deleteEntity']>(
		(input) => {
			const { onUpdate, ...options } = mutationHandler(MutationType.Delete, { id, ...input });

			const update = getUpdateCallback({ onUpdate, mutationType: MutationType.Delete, input });

			return deletePrice({ ...options, update });
		},
		[deletePrice, getUpdateCallback, id, mutationHandler]
	);
	return useMemo(() => ({ createEntity, updateEntity, deleteEntity }), [createEntity, deleteEntity, updateEntity]);
};

export default usePriceMutator;
