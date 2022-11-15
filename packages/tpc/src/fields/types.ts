import { InputHTMLAttributes } from 'react';

import type { AnyObject } from '@eventespresso/utils';

import type { PriceModifierProps, TpcPriceModifier } from '../types';

// 'css' prop conflicts with Chakra UI component props
export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'css'>;

type SupportedInputs = 'input' | 'select' | 'textarea';

export type FieldValue = string | number | boolean;

export interface BaseFieldProps<V = FieldValue> extends InputProps {
	'aria-label': string;
	children?: ((props: AnyObject) => React.ReactNode) | React.ReactNode;
	component?: React.ComponentType | SupportedInputs;
	disabled?: boolean;
	name: string;
	format?: (value: V, name: string) => any;
	formatOnBlur?: boolean;
	parse?: (value: any, name: string) => V;
	getValue: () => V;
	setValue: (value: V) => void;
}

export interface UseBaseField extends Omit<BaseFieldProps<FieldValue>, 'aria-label'> {}

export interface UsePrice {
	getValue: () => FieldValue;
	setValue: (value: FieldValue) => void;
}

export interface UsePriceAmount extends Pick<PriceFieldProps, 'field' | 'price'> {}

export interface PriceFieldProps
	extends PriceModifierProps,
		Omit<BaseFieldProps<number | string>, 'getValue' | 'setValue' | 'name'> {
	field: keyof TpcPriceModifier;
}

export interface TicketPriceFieldProps extends Omit<BaseFieldProps<number>, 'getValue' | 'setValue' | 'name' | 'type'> {}
