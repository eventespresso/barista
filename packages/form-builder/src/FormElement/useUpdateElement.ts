import { useCallback } from 'react';
import * as R from 'ramda';

import { strToPath } from '@eventespresso/utils';

import type { FormElement, PropsPath } from '..';
import { useFormState } from '../state';

type OnChangeValue = (field: PropsPath<FormElement>) => (value: any) => void;

/**
 * Returns an onChange handler for field inputs of an element settings
 */
export const useUpdateElement = (element: FormElement): OnChangeValue => {
	const { updateElement } = useFormState();

	return useCallback<OnChangeValue>(
		(field) => (value) => {
			// create a nested object from the dotted key and value
			const newElement = R.assocPath(strToPath(field), value, {});
			updateElement({ id: element.id, element: newElement });
		},
		[element.id, updateElement]
	);
};
