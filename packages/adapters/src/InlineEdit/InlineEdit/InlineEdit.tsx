import * as Chakra from '@chakra-ui/react';
import { useEditable } from '@chakra-ui/react';

import { Text, Textarea } from '.';

import type { Props } from '.';

export const InlineEdit: React.FC<Props.InlineEdit> = ({
	container: { placeholder = '', ...containerProps },
	preview: { component: Preview, ...preview },
	input,
}) => {
	const { getPreviewProps, getInputProps } = useEditable();
	const previewProps = { ...getPreviewProps(), ...preview };
	const inputProps = { ...getInputProps(), ...input };

	return (
		<Chakra.Editable placeholder={placeholder} {...containerProps}>
			<>
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
