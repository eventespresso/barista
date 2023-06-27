import { useCallback, useEffect, useState } from 'react';
import * as R from 'ramda';

import { __ } from '@eventespresso/i18n';
import { SelectWithLabel, useConfirmationDialog } from '@eventespresso/ui-components';

import type { FormElementProps } from '../../types';
import { ELEMENT_BLOCKS_OPTIONS } from '../../constants';
import { useUpdateElement } from '../useUpdateElement';

const options = ELEMENT_BLOCKS_OPTIONS.filter(R.complement(R.propEq('value', 'FORM_SECTION')));

export const InputType: React.FC<FormElementProps> = ({ element }) => {
	const onUpdateValue = useUpdateElement(element);
	const [currentType, setCurrentType] = useState(element.type);

	const { confirmationDialog, onOpen } = useConfirmationDialog({
		title: __('Change input type'),
		message: __('Some configurations might be lost. Are you sure you want to change the input type?'),
		onConfirm: () => onUpdateValue('type')(currentType),
		onCancel: () => setCurrentType(element.type), // restore the selected value on cancel
	});

	const onChangeValue = useCallback((type) => {
		setCurrentType(type);
	}, []);

	useEffect(() => {
		if (currentType && element.type !== currentType) {
			onOpen();
		}
	}, [currentType, element.type, onOpen]);

	return (
		<>
			<SelectWithLabel
				id={`${element.id}-input-type`}
				// pass key to ensure that the component state is reset when type is changed
				key={element.type}
				label={__('type')}
				options={options}
				value={currentType}
				onChangeValue={onChangeValue}
			/>
			{confirmationDialog}
		</>
	);
};
