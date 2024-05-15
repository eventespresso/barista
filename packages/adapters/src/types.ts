export type CommonInputEvent<T = Element> = React.ChangeEvent<T> | React.FormEvent<T>;

export interface CommonInputProps<T = Element, V = React.ReactText> {
	onChange?: (valueAsString: string, valueAsNumber: number) => void | React.ChangeEventHandler<HTMLInputElement>;
	onChangeValue?: ((value: V, event?: CommonInputEvent<T>) => void) | ((value: any) => void);
}
