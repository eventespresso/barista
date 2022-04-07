import type { CommonInputProps, CommonInputEvent } from '@eventespresso/adapters/src/types';

type T = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

export interface UseOnChange extends Omit<CommonInputProps<T>, 'onChange'> {
	onChange?: (event: React.ChangeEvent<T>) => void;
	isDisabled?: boolean;
}

export type UseOnChangeCallback = (e: CommonInputEvent<T>) => void;
