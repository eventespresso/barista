import { convertInputType } from './convertInputType';
import type { Props as InlineEditProps } from '../InlineEdit/types';
import type { ConvertProps } from './types';

export const convertProps = <T extends InlineEditProps.InputType>({
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
	const input: InlineEditProps.Type<T>['input'] = initInput ?? { _type: 'text' };

	const container: InlineEditProps.Type<T>['container'] = initContainer ?? {};

	const preview: InlineEditProps.Type<T>['preview'] = initPreview ?? {};

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
