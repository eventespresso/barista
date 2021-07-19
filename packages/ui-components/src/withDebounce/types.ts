import { CommonInputProps } from '@eventespresso/adapters';

export interface WithDebounceProps {
	debounceDelay?: number;
	onChangeInstantValue?: (value: any) => void;
}

export interface InternalDebounceProps extends CommonInputProps<any, any> {
	value?: any;
	isChecked?: boolean;
}
