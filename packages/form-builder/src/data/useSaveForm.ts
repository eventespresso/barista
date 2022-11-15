import { useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { FormState, useFormState } from '../state';
import { useMutateElements } from './useMutateElements';
import { useMutateSections } from './useMutateSections';

export type SaveFormCb = (state: FormState) => Promise<void>;

const DEBOUNCE_TIME = 5000; // milliseconds

export const useSaveForm = (): SaveFormCb => {
	const mutateElements = useMutateElements();
	const mutateSections = useMutateSections();

	const { getData } = useFormState();

	const saveForm = useDebouncedCallback<SaveFormCb>(async (state) => {
		// console.log('state', state);
		mutateSections(state.sections, state.deletedSections);
		mutateElements(state.elements, state.deletedElements);
	}, DEBOUNCE_TIME);

	const data = getData();

	useEffect(() => {
		saveForm(data);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(data)]);

	return;
};
