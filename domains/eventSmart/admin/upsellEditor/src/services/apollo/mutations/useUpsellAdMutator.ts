import { useCallback, useMemo } from 'react';

import { ExecutionResult, MutationType, useMutationWithFeedback } from '@eventespresso/data';
import { __ } from '@eventespresso/i18n';

import type { UpdateUpsellAdInput } from './types';
import { UPDATE_UPSELL_AD } from './';
import useMutationHandler from './useMutationHandler';
import type { UpdateUpsellAdResult } from './types';

interface UpsellAdMutator {
	updateEntity: (input: UpdateUpsellAdInput) => Promise<ExecutionResult<UpdateUpsellAdResult>>;
}

const useUpsellAdMutator = (id = ''): UpsellAdMutator => {
	const updateUpsellAd = useMutationWithFeedback({
		typeName: __('upsell ad'),
		mutationType: MutationType.Update,
		mutation: UPDATE_UPSELL_AD,
	});

	const mutationHandler = useMutationHandler();

	const updateEntity = useCallback<UpsellAdMutator['updateEntity']>(
		(input) => {
			const options = mutationHandler(MutationType.Update, { id, ...input });

			return updateUpsellAd(options);
		},
		[id, mutationHandler, updateUpsellAd]
	);

	return useMemo(() => ({ updateEntity }), [updateEntity]);
};

export default useUpsellAdMutator;
