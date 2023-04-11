import React from 'react';
import InputMask from 'react-input-mask';
import { TextInputWithLabel } from '../../TextInput';
import { TextInputProps } from '@eventespresso/adapters';

interface WithInputMaskProps {
	mask: string;
}

const withInputMask = <P extends TextInputProps>(WrappedComponent: React.ComponentType<P>) => {
	const WithInputMask: React.FC<WithInputMaskProps & P> = ({ mask, ...props }) => (
		<InputMask mask={mask} maskChar={null} value={props.value} onChange={props.onChange}>
			{(inputProps: TextInputProps) => {
				// Ensure that only the required props are passed down
				return <WrappedComponent {...(inputProps as P)} {...props} />;
			}}
		</InputMask>
	);

	return WithInputMask;
};

export const MaskInput = withInputMask(TextInputWithLabel);
