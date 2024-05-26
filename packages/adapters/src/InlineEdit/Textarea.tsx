import { useCallback } from 'react';
import * as Chakra from '@chakra-ui/react';

import { isEnterKey, isEscapeKey, insertStrAt } from '@eventespresso/utils';

import type { Props } from './types';

export const Textarea: React.FC<Props.InputForTextarea> = ({ onCancel, setValue, ...props }) => {
	type OnKeyDown = React.KeyboardEventHandler<HTMLInputElement>;
	const onKeyDown = useCallback<OnKeyDown>(
		(e) => {
			if (isEnterKey(e)) {
				e.preventDefault(); // prevent submit

				// a number that represents the beginning index of the selected text
				const cursorPosition = e.currentTarget.selectionStart;
				if (cursorPosition === null) {
					console.error(`Trying to use .selectionStart on invalid tag!\nElement:\n${e.currentTarget}`);
					return;
				}

				// insert newline at the current cursor position
				setValue((v) => insertStrAt(v, `\n`, cursorPosition));
			}

			if (isEscapeKey(e)) onCancel();
		},
		[setValue, onCancel]
	);

	return <Chakra.EditableInput as='textarea' onKeyDown={onKeyDown} {...props} />;
};
