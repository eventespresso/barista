import * as Chakra from '@chakra-ui/react';
import { useEditable } from '@chakra-ui/react';

import { Text, Textarea } from '.';

import type { Props } from '.';

export const InlineEdit: React.FC<Props.InlineEdit> = ({
	container: { placeholder, value: initValue, defaultValue, ...container },
	preview: { component: Preview, legacyComponent: LegacyPreview, ...preview },
	input,
}) => {
	const { getPreviewProps, getInputProps, ...chakraProps } = useEditable({
		placeholder: placeholder ?? '',
		value: defaultValue ?? initValue ?? '',
		defaultValue: defaultValue ?? '',
	});
	const previewProps = { ...getPreviewProps(), ...preview };
	const inputProps = { ...getInputProps(), ...input };

	// TODO: hmmm... do we need local state…

	// TODO: useCallback
	const convertLegacyPreviewProps = (): Props.Legacy.InlineEditPreviewProps => {
		const props: Props.Legacy.InlineEditPreviewProps = {
			isEditing: chakraProps.isEditing,
			onRequestEdit: chakraProps.onEdit,
			value: chakraProps.value,
		};

		if (preview.tooltip) props.tooltip = preview.tooltip;
		if (preview.className) props.className = preview.className;
		if (preview['aria-describedby']) {
			props['aria-describedby'] = preview['aria-describedby'];
		}

		return props;
	};

	return (
		<Chakra.Editable placeholder={placeholder ?? ''} {...container}>
			<>
				{LegacyPreview && <LegacyPreview {...convertLegacyPreviewProps()} />}

				{Preview && <Preview {...previewProps} />}
				{!Preview && <Chakra.EditablePreview {...previewProps} />}

				{isText(inputProps) && <Text {...inputProps} />}
				{isTextarea(inputProps) && <Textarea {...inputProps} />}
			</>
		</Chakra.Editable>
	);
};

function isText(input: Props.Input): input is Props.InputForText {
	return input._type === 'text';
}

function isTextarea(input: Props.Input): input is Props.InputForTextarea {
	return input._type === 'textarea';
}
