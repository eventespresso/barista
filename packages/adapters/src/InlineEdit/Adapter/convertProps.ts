import { convertInputType } from './convertInputType';
import type { ConvertProps } from './types';
import { createInputProp } from './createInputProp';

export const convertProps = <T extends ConvertProps.InputType>({
	// new props
	container: initContainer,
	input: initInput,
	preview: initPreview,
	// legacy props
	value,
	defaultValue,
	onChange,
	previewClassName,
	placeholder,
	editableInputClassName,
	inputType,
	inputClassName,
	'aria-describedby': ariaDescribedby,
	Preview,
	tooltip,
}: ConvertProps.Parameters<T>): ConvertProps.Return<T> => {
	const input: ConvertProps.Input<T> = createInputProp<T>({ input: initInput, inputType });

	const container: ConvertProps.Container<T> = initContainer ?? {};

	const preview: ConvertProps.Preview<T> = initPreview ?? {};

	if (value) container.value = value;
	if (defaultValue) container.defaultValue = defaultValue;
	if (onChange) container.onChange = onChange;
	if (previewClassName) container.className = previewClassName;
	if (placeholder) container.placeholder = placeholder;

	if (editableInputClassName) input.className = editableInputClassName;
	if (inputType) input._type = convertInputType(inputType);

	if (inputClassName) preview.className = inputClassName;
	if (ariaDescribedby) preview['aria-describedby'] = ariaDescribedby;
	if (Preview) preview.Legacy = Preview;
	if (tooltip) preview.tooltip = tooltip;

	return { container, preview, input };
};
