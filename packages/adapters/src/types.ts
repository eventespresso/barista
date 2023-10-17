export type CommonInputEvent<T = Element> = React.ChangeEvent<T> | React.FormEvent<T>;

export interface CommonInputProps<T = Element, V = React.ReactText> {
	onChange?: (valueAsString: string, valueAsNumber: number) => void | React.ChangeEventHandler<T>;
	onChangeValue?: onChangeValueI<T, V>;
}

interface onChangeValueI<T = Element, V = React.ReactText> {
	(value: any): void;
	(value: V, event?: CommonInputEvent<T>): void;
}
