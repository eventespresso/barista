import type React from 'react';
import type * as Chakra from '@chakra-ui/react';
import type { EditableInputProps, EditablePreviewProps, UseEditableReturn } from '@chakra-ui/react';
import type { TooltipProps } from '../Tooltip';

export module Component {
	export type Props = Chakra.EditableProps & {
		editableInputClassName?: string;
		inputClassName?: string;
		inputType?: 'heading' | 'number' | 'textarea' | 'text';
		lineCount?: number;
		Preview?: React.ComponentType<Preview.Props>;
		previewClassName?: string;
		textAreaClassName?: string;
		tooltip?: string;
	};

	export type NewProps = {
		container?: Chakra.EditableProps;

		preview?: Preview.Props & {
			component?: Preview;
		};

		input?: Input.Props;
	};

	type Preview = React.ComponentType<Preview.Props>;
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
		onCancel: UseEditableReturn['onCancel'];
		setValue: React.Dispatch<React.SetStateAction<string>>;
		type: 'heading' | 'number' | 'textarea' | 'text';
		// MAYBE: refactor
		className?: {
			input?: string;
			textArea?: string;
		};
	};
}
