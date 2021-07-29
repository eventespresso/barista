import { useCallback, useEffect, useState } from 'react';

import { Editable as ChakraEditable } from '@chakra-ui/react';

import { usePrevious, useIfMounted } from '@eventespresso/hooks';
import InlineEditInput from './InlineEditInput';
import InlineEditPreview from './InlineEditPreview';
import type { InlineEditProps } from './types';

export const InlineEdit: React.FC<InlineEditProps> = ({
	'aria-describedby': ariaDescribedby,
	defaultValue,
	'data-testid': testid,
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

	const onSubmitHandler = useCallback<InlineEditProps['onSubmit']>(() => {
		// Update the curerntly submitted value
		setPrevSubmitValue(currentValue);

		if (typeof onChange === 'function') {
			onChange(currentValue);
		}
	}, [currentValue, onChange]);

	return (
		<ChakraEditable
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
						<InlineEditPreview
							aria-describedby={ariaDescribedby}
							className={inputClassName}
							data-testid={testid && `${testid}-preview`}
							isEditing={isEditing}
							onRequestEdit={onEdit}
							Preview={Preview}
							tooltip={tooltip}
							value={currentValue}
						/>
						<InlineEditInput
							data-testid={testid}
							editableInputClassName={editableInputClassName}
							inputType={inputType}
							setValue={setCurrentValue}
							onCancel={onCancelEdit}
						/>
					</>
				);
			}}
		</ChakraEditable>
	);
};
