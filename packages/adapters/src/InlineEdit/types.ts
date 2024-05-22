import type React from 'react';
import type * as Chakra from '@chakra-ui/react';
import type { EditableInputProps, EditablePreviewProps, UseEditableReturn } from '@chakra-ui/react';
import type { TooltipProps } from '../Tooltip';

export module Component {
	export type Props = {
		container?: Container.Props;
		preview?: PreviewProps;
		input?: Input.Props;
	};

	type PreviewProps = Preview.Props & {
		component?: React.FunctionComponent<Preview.Props>;
	};
}

export module Container {
	export type Props = Chakra.EditableProps;
}

export module Preview {
	export type Props = EditablePreviewProps & {
		onRequestEdit?: () => void; // MAYBE: replace when using hook (?)
		isEditing?: UseEditableReturn['isEditing'];
		value?: UseEditableReturn['value'];
		tooltip?: TooltipProps['tooltip'];
	};
}

export module Input {
	export type Props = EditableInputProps & {
		onCancel?: UseEditableReturn['onCancel'];
		setValue?: React.Dispatch<React.SetStateAction<string>>;
		type?: 'heading' | 'number' | 'textarea' | 'text';
		// MAYBE: refactor
		className?: {
			input?: string;
			textArea?: string;
		};
	};
}
