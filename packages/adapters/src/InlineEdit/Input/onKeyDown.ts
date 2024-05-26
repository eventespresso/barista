import { insertStrAt, isEnterKey, isEscapeKey } from '@eventespresso/utils';

import type { OnKeyDown } from './types';

export const createOnKeyDown =
	(setValue: OnKeyDown.SetValue, onCancel: OnKeyDown.OnCancel): OnKeyDown.Event =>
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
	};
