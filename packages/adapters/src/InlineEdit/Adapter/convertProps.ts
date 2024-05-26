import { convertInputType } from './convertInputType';
import type { Props } from '../InlineEdit';
import type { ConvertProps } from './types';

export const convertProps: ConvertProps.Fn = ({
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
}) => {
	const input: Props.Type['input'] = initInput ?? { _type: 'text' };
	const container: Props.Type['container'] = initContainer ?? {};
	const preview: Props.Type['preview'] = initPreview ?? {};

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
