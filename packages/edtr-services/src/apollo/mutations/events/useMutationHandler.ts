import { useCallback } from 'react';

import { MutationType, MutationInput, OperationVariables } from '@eventespresso/data';
import type { Event } from '@eventespresso/constants';

import useOptimisticResponse from './useOptimisticResponse';
import type { MutationHandler } from '../types';
import type { EventBaseInput } from './types';

type MH = MutationHandler<Event, EventBaseInput>;

const useMutationHandler = (): MH => {
	const getOptimisticResponse = useOptimisticResponse();

	const createVariables = useCallback((mutationType: MutationType, input: MutationInput): OperationVariables => {
		const mutationInput: MutationInput = {
			clientMutationId: `${mutationType}_EVENT`,
			...input,
		};

		return {
			input: mutationInput,
		};
	}, []);

	const mutator = useCallback<MH>(
		(mutationType, input) => {
			const variables = createVariables(mutationType, input);
			const optimisticResponse = getOptimisticResponse(mutationType, input);

			return { variables, optimisticResponse };
		},
		[createVariables, getOptimisticResponse]
	);

	return mutator;
};

export default useMutationHandler;
