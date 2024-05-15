import type React from 'react';

export type CommonInputEvent<T extends HTMLElement = HTMLElement> = React.ChangeEvent<T> | React.FormEvent<T>;

export interface CommonInputProps<T extends HTMLElement = HTMLElement, V extends React.ReactText = React.ReactText> {
	onChange?: (valueAsString: string, valueAsNumber: number) => void | React.ChangeEventHandler<HTMLInputElement>;
	onChangeValue?: ((value: V, event?: CommonInputEvent<T>) => void) | ((value: any) => void);
}
