import type { ConvertInputType } from './types';

export const convertInputType: ConvertInputType.Fn = (inputType) => {
	switch (inputType) {
		case 'textarea':
			return 'textarea';
		default:
			return 'text';
	}
};
