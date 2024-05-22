import { useCallback, useEffect, useState } from 'react';
import * as Chakra from '@chakra-ui/react';

import { usePrevious, useIfMounted } from '@eventespresso/hooks';

import InlineEditInput from './InlineEditInput';

import type { Component } from './types';

export const InlineEdit: React.FC<Component.Props> = ({
	'aria-describedby': ariaDescribedby,
	defaultValue,
	editableInputClassName,
	inputClassName,
	inputType,
	onChange,
	placeholder = '',
	Preview,
	previewClassName,
	tooltip,
	value,
}) => {
	const [currentValue, setCurrentValue] = useState(defaultValue || value);
	const [prevSubmitValue, setPrevSubmitValue] = useState(currentValue);

	const previousValue = usePrevious(value);
	const ifMounted = useIfMounted();

	useEffect(() => {
		// update value if updated from consumer
		ifMounted(() => {
			if (value !== previousValue) {
				setCurrentValue(value);
				setPrevSubmitValue(value);
			}
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value]);

	type OnSubmit = Component.Props['onSubmit'];

	const onSubmitHandler = useCallback<OnSubmit>(() => {
		// Update the curerntly submitted value
		setPrevSubmitValue(currentValue);

		if (typeof onChange === 'function') {
			onChange(currentValue);
		}
	}, [currentValue, onChange]);

	return (
		<Chakra.Editable
			className={previewClassName}
			onChange={setCurrentValue}
			onSubmit={onSubmitHandler}
			placeholder={placeholder}
			value={currentValue}
		>
			{({ isEditing, onCancel, onEdit }) => {
				// eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
				const onCancelEdit = () => {
					onCancel();
					// reset current value to what it was earlier
					setCurrentValue(prevSubmitValue);
				};

				return (
					<>
						{!Preview ? (
							<Chakra.EditablePreview />
						) : (
							<Preview
								aria-describedby={ariaDescribedby}
								className={inputClassName}
								isEditing={isEditing} // comes from chakra hook
								onRequestEdit={onEdit} // comes from chakra hook
								tooltip={tooltip}
								value={currentValue}
							/>
						)}
						<InlineEditInput
							editableInputClassName={editableInputClassName}
							inputType={inputType}
							setValue={setCurrentValue}
							onCancel={onCancelEdit}
						/>
					</>
				);
			}}
		</Chakra.Editable>
	);
};
