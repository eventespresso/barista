export type CommonInputEvent<T = Element> = React.ChangeEvent<T> | React.FormEvent<T>;

export interface CommonInputProps<T = Element, V = React.ReactText> {
	onChange?: (valueAsString: string, valueAsNumber: number) => void | React.ChangeEventHandler<T>;
	onChangeValue?: (value: any) => void | ((value: V, event?: CommonInputEvent<T>) => void);
}
