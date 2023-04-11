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
				const { ...restInputProps } = inputProps;
				return <WrappedComponent {...(restInputProps as P)} {...props} />;
			}}
		</InputMask>
	);

	return WithInputMask;
};

export const MaskInput = withInputMask(TextInputWithLabel);

/* use case 
*****************************************
<MaskInput label="Phone Number" name="phonenumber" mask="(999) 999-9999" />
<MaskInput   label="Credit Card Number" name="creditCardNumber" mask="9999 9999 9999 9999" />
<MaskInput label="Credit Card Date" name="creditcardDate" mask="99/99" />
....

###  In more detail.. (ex : Credit Card Number)

import React from 'react';
import { MaskInput } from './MaskInput';

const MyComponent = () => {
	const [creditCardValue, setCreditCardValue] = useState<string>('');
	const handleCreditCardChange = useCallback<TextInputProps['onChange']>(
		(event) => setCreditCardValue(event.target.value),
		[]
	);

  return (
    <MaskInput 
      label="Credit Card Number"
      id="credit-card-number"
      name="creditCardNumber"
      value={creditCardNumber}
      onChange={handleCreditCardNumberChange}
      mask="9999 9999 9999 9999"
    />
  );
};
*****************************************
*/
