import { useMemo } from 'react';
import * as Chakra from '@chakra-ui/react';

import { isEnterKey, isEscapeKey } from '@eventespresso/utils';

import type { BoxProps } from '@chakra-ui/react';
import type { Input } from './types';

/**
 * Inserts substring into a string at a given position.
 */
const insertStrAt = (str: string, subStr: string, pos: number): string => {
	return `${str.slice(0, pos)}${subStr}${str.slice(pos)}`;
};

type Component = React.FC<Input.Props>;

const InlineEditInput: Component = ({ editableInputClassName, inputType, onCancel, setValue, textAreaClassName }) => {
	const textareaProps: BoxProps = useMemo(
		() => ({
			as: 'textarea',
			className: textAreaClassName,
			// pass our own onKeyDown handler for a11y
			onKeyDown: (e: React.KeyboardEvent) => {
				if (isEnterKey(e)) {
					const cursorPosition = (e.target as HTMLInputElement).selectionStart;
					// prevent submit
					e.preventDefault();

					// insert newline at the current cursor position
					setValue((v) => insertStrAt(v, `\n`, cursorPosition));
				} else if (isEscapeKey(e)) {
					onCancel();
				}
			},
		}),
		[onCancel, setValue, textAreaClassName]
	);

	if (inputType === 'textarea') {
		return <Chakra.EditableInput {...textareaProps} />;
	}

	return <Chakra.EditableInput className={editableInputClassName} />;
};

export default InlineEditInput;
