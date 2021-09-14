import { useCallback, useRef } from 'react';
import { MutationTuple, OperationVariables, useMutation } from '@apollo/client';
import { DocumentNode } from 'graphql';

import { useSystemNotifications } from '@eventespresso/toaster';
import { uuid } from '@eventespresso/utils';
import { sprintf, __ } from '@eventespresso/i18n';

import type { MutationType } from './types';

interface MutationWithFeedbackArgs {
	typeName: string; // e.g. "Datetime", "Ticket", "PriceType"
	mutation: DocumentNode;
	mutationType: MutationType;
}

type MutationWithFeedback = <TData = any, TVariables = OperationVariables>(
	args: MutationWithFeedbackArgs
) => MutationTuple<TData, TVariables>['0'];

type ResultType = 'ERROR' | 'SUCCESS' | 'LOADING';

export const MUTATION_STRINGS: { [key in `${ResultType}:${MutationType}`]: string } = {
	/* eslint-disable @wordpress/i18n-translator-comments */
	'ERROR:CREATE': __('error creating %s'),
	'ERROR:DELETE': __('error deleting %s'),
	'ERROR:UPDATE': __('error updating %s'),
	'LOADING:CREATE': __('creating %s'),
	'LOADING:DELETE': __('deleting %s'),
	'LOADING:UPDATE': __('updating %s'),
	'SUCCESS:CREATE': __('successfully created %s'),
	'SUCCESS:DELETE': __('successfully deleted %s'),
	'SUCCESS:UPDATE': __('successfully updated %s'),
	/* eslint-enable @wordpress/i18n-translator-comments */
};

const useMutationWithFeedback: MutationWithFeedback = ({ typeName, mutation, mutationType }) => {
	// generate a toaster key that sustains re-renders
	const toasterKey = useRef(uuid());

	const key = toasterKey.current;

	const toaster = useSystemNotifications();

	/**
	 * Get the toaster message based upon typeName and mutationType
	 */
	const getToasterMessage = useCallback(
		(resultType?: ResultType) => {
			const key = `${resultType}:${mutationType}` as const;
			// eslint-disable-next-line @wordpress/valid-sprintf
			const message = sprintf(MUTATION_STRINGS[key], typeName);

			return message;
		},
		[mutationType, typeName]
	);

	/**
	 * Displays a success toaster on complete
	 */
	const onCompleted = useCallback<VoidFunction>(() => {
		const successMessage = getToasterMessage('SUCCESS');
		toaster.dismiss(key);
		toaster.update({ key, message: successMessage, type: 'success' });
	}, [getToasterMessage, key, toaster]);

	/**
	 * Displays an error toaster on error
	 */
	const onError = useCallback(() => {
		const errorMessage = getToasterMessage('ERROR');
		toaster.dismiss(key);
		toaster.error({ message: errorMessage });
	}, [getToasterMessage, key, toaster]);

	/**
	 * Displays a loading indicator when the mutation starts
	 */
	const onMutationStart = useCallback<VoidFunction>(() => {
		const message = getToasterMessage('LOADING');
		toaster.loading({ autoClose: false, key, message });
	}, [getToasterMessage, key, toaster]);

	/**
	 * Fire it all up
	 */
	const [mutate] = useMutation(mutation, {
		onCompleted,
		onError,
	});

	/**
	 * Just insert the loading indicator call into mutation function
	 */
	const doMutation = useCallback<typeof mutate>(
		(...args) => {
			onMutationStart();
			return mutate(...args);
		},
		[mutate, onMutationStart]
	);

	return doMutation;
};

export default useMutationWithFeedback;
