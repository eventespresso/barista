import { useCallback, useMemo } from 'react';

import { MutationType, MutationFunction, useMutationWithFeedback } from '@eventespresso/data';
import { useSystemNotifications } from '@eventespresso/toaster';

import type { UpdateEventInput } from './types';
import { UPDATE_EVENT } from './';
import useMutationHandler from './useMutationHandler';
import type { UpdateEventResult } from './types';
import { SINGULAR_ENTITY_NAME } from '../../../constants';

interface EventMutator {
	updateEntity: MutationFunction<UpdateEventResult, UpdateEventInput>;
}

type EM = EventMutator;

const useEventMutator = (id = ''): EM => {
	const toaster = useSystemNotifications();

	const updateEvent = useMutationWithFeedback({
		typeName: SINGULAR_ENTITY_NAME.EVENT,
		mutationType: MutationType.Update,
		mutation: UPDATE_EVENT,
		toaster,
	});

	const mutationHandler = useMutationHandler();

	const updateEntity = useCallback<EM['updateEntity']>(
		(input) => {
			const options = mutationHandler(MutationType.Update, { id, ...input });

			return updateEvent(options);
		},
		[id, mutationHandler, updateEvent]
	);

	return useMemo(() => ({ updateEntity }), [updateEntity]);
};

export default useEventMutator;
