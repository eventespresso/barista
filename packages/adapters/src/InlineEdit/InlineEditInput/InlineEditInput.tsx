import { useCallback } from 'react';
import * as Chakra from '@chakra-ui/react';

import { isEnterKey, isEscapeKey } from '@eventespresso/utils';

import type { Props } from '.';

/**
 * Inserts substring into a string at a given position.
 */
const insertStrAt = (str: string, subStr: string, pos: number): string => {
	return `${str.slice(0, pos)}${subStr}${str.slice(pos)}`;
};

// TODO: refactor component to use new prop types

export const InlineEditInput: React.FC<Props.Input> = ({ type, ...props }) => {
	if (isTextarea(type, props)) {
		type OnKeyDown = React.KeyboardEventHandler<HTMLInputElement>;

		const { onCancel, setValue, ...textareaProps } = props;

		const onKeyDown = useCallback<OnKeyDown>(
			(e) => {
				if (isEnterKey(e)) {
					// prevent submit
					e.preventDefault();
					// TODO: need to test this due to change from 'target' to 'currentTarget'
					// a number that represents the beginning index of the selected text
					const cursorPosition = e.currentTarget.selectionStart;
					if (cursorPosition === null) {
						console.error(`Trying to use .selectionStart on invalid tag!\nElement:\n${e.currentTarget}`);
						return;
					}
					// insert newline at the current cursor position
					setValue((v) => insertStrAt(v, `\n`, cursorPosition));
				}

				if (isEscapeKey(e)) {
					onCancel();
				}
			},
			[setValue, onCancel]
		);

		return <Chakra.EditableInput as='textarea' onKeyDown={onKeyDown} {...textareaProps} />;
	}

	return <Chakra.EditableInput {...props} />;
};

function isTextarea(type: Props.Input['type'], props: Omit<Props.Input, 'type'>): props is Props.InputForTextarea {
	return type === 'textarea';
}
