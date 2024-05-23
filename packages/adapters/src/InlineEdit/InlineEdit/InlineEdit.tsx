import * as Chakra from '@chakra-ui/react';
import { useEditable } from '@chakra-ui/react';

import { InlineEditInput } from '../InlineEditInput';

import type { Props } from '.';

export const InlineEdit: React.FC<Props.InlineEdit> = ({
	container: { placeholder = '', ...containerProps },
	preview: { component: Preview, ...preview },
	input,
}) => {
	const cProps = useEditable(); // cProps = chakra-ui props

	const previewProps = { ...cProps.getPreviewProps(), ...preview };

	return (
		<Chakra.Editable placeholder={placeholder} {...containerProps}>
			<>
				{Preview && <Preview {...previewProps} />}
				{!Preview && <Chakra.EditablePreview {...previewProps} />}

				<InlineEditInput {...cProps.getInputProps()} {...input} />
			</>
		</Chakra.Editable>
	);
};
