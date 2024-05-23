import { Component } from '.';

import type { Props as PropsType } from '.';

export const Adapter: ReactFC = (props) => {
	const newProps = legacyToNew(props);
	return <Component {...newProps} />;
};

type ReactFC = React.FC<Props>;
type Props = PropsType.Input & PropsType.Legacy.InlineEditInputProps;

function legacyToNew({
	// legacy props
	inputType,
	editableInputClassName,
	textAreaClassName,
	// new props
	...props
}: Props): PropsType.Input {
	if (inputType) props.type = inputType;
	if (editableInputClassName) props.className = editableInputClassName;
	if (textAreaClassName) props.className = textAreaClassName;

	return props;
}
