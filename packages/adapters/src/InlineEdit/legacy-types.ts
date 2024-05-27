import type * as Chakra from '@chakra-ui/react';

export module Legacy {
	/**
	 * @deprecated these are deprecated but to avoid HUGE amount of refactoring, legacy props will be used as an adapter between new and old types
	 */
	export type InputType = 'heading' | 'number' | 'text' | 'textarea';

	/**
	 * @deprecated these are deprecated but to avoid HUGE amount of refactoring, legacy props will be used as an adapter between new and old types
	 */
	export type InlineEditProps = Chakra.EditableProps & {
		editableInputClassName?: string;
		inputClassName?: string;
		inputType?: InputType;
		lineCount?: number;
		Preview?: React.ComponentType<InlineEditPreviewProps>;
		previewClassName?: string;
		textAreaClassName?: string;
		tooltip?: string;
	};

	/**
	 * @deprecated these are deprecated but to avoid HUGE amount of refactoring, legacy props will be used as an adapter between new and old types
	 */
	export type InlineEditPreviewProps = Omit<
		InlineEditProps,
		'onCancel' | 'onChange' | 'onChangeValue' | 'onEdit' | 'onSubmit'
	> & {
		isEditing?: boolean;
		onRequestEdit?: () => void;
		value?: string;
	};

	/**
	 * @deprecated these are deprecated but to avoid HUGE amount of refactoring, legacy props will be used as an adapter between new and old types
	 */
	export type InlineEditInputProps = Pick<
		InlineEditProps,
		'editableInputClassName' | 'inputType' | 'textAreaClassName'
	> & {
		onCancel: () => void;
		setValue: React.Dispatch<React.SetStateAction<string>>;
	};
}

// backwards compatibility with existing type consumers
export type InlineEditProps = Legacy.InlineEditProps;
export type InlineEditPreviewProps = Legacy.InlineEditPreviewProps;
export type InlineEditInputProps = Legacy.InlineEditInputProps;
