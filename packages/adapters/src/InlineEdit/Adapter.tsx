import { Component } from '.';

import type { Props as PropsType } from '.';
import { useMemo } from 'react';

export const Adapter: ReactFC = (props) => {
	const newProps = useMemo(() => legacyToNew(props), [props]);
	return <Component {...newProps} />;
};

type ReactFC = React.FC<Props>;
type Props = PropsType.Legacy.InlineEditProps & PropsType.InlineEdit;

function legacyToNew({
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
}: Props): Required<PropsType.InlineEdit> {
	const input: PropsType.InlineEdit['input'] = initInput ?? {};
	const container: PropsType.InlineEdit['container'] = initContainer ?? {};
	const preview: PropsType.InlineEdit['preview'] = initPreview ?? {};

	if (value) container.value = value;
	if (defaultValue) container.defaultValue = defaultValue;
	if (onChange) container.onChange = onChange;
	if (previewClassName) container.className = previewClassName;
	if (placeholder) container.placeholder = placeholder;

	if (editableInputClassName) input.className = editableInputClassName;
	if (inputType) input.type = inputType;

	if (inputClassName) preview.className = inputClassName;
	if (ariaDescribedby) preview['aria-describedby'] = ariaDescribedby;
	if (Preview) preview.legacyComponent = Preview;
	if (tooltip) preview.tooltip = tooltip;

	return { container, preview, input };
}
