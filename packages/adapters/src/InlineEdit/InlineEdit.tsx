import * as Chakra from '@chakra-ui/react';
import { useEditable, UseEditableReturn } from '@chakra-ui/react';

import { Textarea } from '.';

import type { Props } from './types';

// BUG: is missing the following properties from type 'InlineEdit': container, preview, input

export const InlineEdit: React.FC<Props.InlineEdit> = ({
	container: { placeholder, value: initValue, defaultValue, ...container },
	preview: { component: Preview, legacyComponent: LegacyPreview, ...preview },
	input: { _fries, ...input },
}) => {
	const { value, ...chakraProps } = useEditable({
		placeholder: placeholder ?? '',
		value: defaultValue ?? initValue ?? '',
		defaultValue: defaultValue ?? '',
	});

	const previewProps = { ...chakraProps.getPreviewProps(), ...preview };
	const inputProps = { ...chakraProps.getInputProps(), ...input };

	// TODO: hmmm... do we need local state…

	// TODO: useCallback
	const convertLegacyPreviewProps = (): Props.Legacy.InlineEditPreviewProps => {
		const props: Props.Legacy.InlineEditPreviewProps = {
			isEditing: chakraProps.isEditing,
			onRequestEdit: chakraProps.onEdit, // BUG:
			value: value,
		};

		if (preview.tooltip) props.tooltip = preview.tooltip;
		if (preview.className) props.className = preview.className;
		if (preview['aria-describedby']) {
			props['aria-describedby'] = preview['aria-describedby'];
		}

		return props;
	};

	return (
		<Chakra.Editable placeholder={placeholder ?? ''} {...container} value={value}>
			{/* TODO: this looks messy... */}
			{LegacyPreview && <LegacyPreview {...convertLegacyPreviewProps()} />}
			{Preview && <Preview {...previewProps} />}
			{!Preview && !LegacyPreview && <Chakra.EditablePreview {...previewProps} />}

			{isText(_fries, inputProps) && <Chakra.EditableInput {...inputProps} />}
			{isTextarea(_fries, inputProps) && <Textarea _fries='textarea' {...inputProps} />}
		</Chakra.Editable>
	);
};

function isText(
	type: Props.Input['_fries'],
	input: Omit<Props.Input, '_fries'> & ReturnType<UseEditableReturn['getInputProps']>
): input is Omit<Props.InputForText, '_fries'> {
	return type === 'text';
}

function isTextarea(
	type: Props.Input['_fries'],
	input: Omit<Props.Input, '_fries'> & ReturnType<UseEditableReturn['getInputProps']>
): input is Omit<Props.InputForTextarea, '_fries'> {
	return type === 'textarea';
}
