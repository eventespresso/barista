import { useCallback } from 'react';
import * as R from 'ramda';

import { DeepKeyOf, strToPath } from '@eventespresso/utils';

import type { FormSection } from '../types';
import { useFormState } from '../state';

type OnChangeValue = (field: DeepKeyOf<FormSection>) => (value: any) => void;

/**
 * Returns an onChange handler for field inputs of a section settings
 */
export const useUpdateSection = (formSection: FormSection): OnChangeValue => {
	const { updateSection } = useFormState();

	return useCallback<OnChangeValue>(
		(field) => (value) => {
			// create a nested object from the dotted key and value
			const newSection = R.assocPath(strToPath(field), value, {});
			updateSection({ id: formSection.id, section: newSection });
		},
		[formSection.id, updateSection]
	);
};
