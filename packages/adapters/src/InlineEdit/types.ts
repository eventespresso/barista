import type React from 'react';
import type * as Chakra from '@chakra-ui/react';

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
}

export module Preview {
	export type Props = Partial<
		Omit<Component.Props, 'onCancel' | 'onChange' | 'onChangeValue' | 'onEdit' | 'onSubmit'>
	> & {
		isEditing?: boolean;
		onRequestEdit?: () => void;
		value?: string;
	};
}

export module Input {
	export type Props = Pick<Component.Props, 'editableInputClassName' | 'inputType' | 'textAreaClassName'> & {
		onCancel: () => void;
		setValue: React.Dispatch<React.SetStateAction<string>>;
	};
}
