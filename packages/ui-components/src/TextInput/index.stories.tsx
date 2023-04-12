import { useState, useCallback } from 'react';
import type { Story, Meta } from '@storybook/react/types-6-0';

import { TextInput, TextInputWithLabel, MaskInput } from '../';
import { Stack } from '@eventespresso/adapters';
import type { TextInputWithLabelProps } from '../';

export default {
	title: 'Components/TextInput',
} as Meta;

type TextInputStory = Story<TextInputWithLabelProps>;
const generateUniqueId = (prefix: string) => `${prefix}-${Math.random().toString(36).substr(2, 9)}`;

export const Basic: TextInputStory = () => (
	<Stack align='start' direction='column' spacing={16} w={480}>
		<TextInput placeholder='Basic input' />
	</Stack>
);

export const Controlled: TextInputStory = () => {
	const [value, setValue] = useState('Starting...');
	const handleChange = useCallback<TextInputWithLabelProps['onChange']>((event) => setValue(event.target.value), []);

	return (
		<Stack align='start' direction='column' spacing={8} w={480}>
			<TextInput value={value} onChange={handleChange} placeholder='Controlled input' />
			<pre>{JSON.stringify(value, null, 2)}</pre>
		</Stack>
	);
};

export const WithInputMask: TextInputStory = () => {
	const [creditCardValue, setCreditCardValue] = useState<string>('');
	const handleCreditCardChange = useCallback<TextInputWithLabelProps['onChange']>(
		(event) => setCreditCardValue(event.target.value),
		[]
	);

	const [phoneNumberValue, setPhoneNumberValue] = useState<string>('');
	const handlePhoneNumberChange = useCallback<TextInputWithLabelProps['onChange']>(
		(event) => setPhoneNumberValue(event.target.value),
		[]
	);

	const [creditCardDateValue, setCreditCardDateValue] = useState<string>('');
	const handleCreditCardDateChange = useCallback<TextInputWithLabelProps['onChange']>(
		(event) => setCreditCardDateValue(event.target.value),
		[]
	);

	return (
		<Stack align='start' direction='column' spacing={8} w={480}>
			<MaskInput
				label='Credit Card Number'
				id={generateUniqueId('credit-card-number')}
				name='creditCardNumber'
				value={creditCardValue}
				onChange={handleCreditCardChange}
				mask='9999 9999 9999 9999'
			/>
			<MaskInput
				label='Phone Number'
				id={generateUniqueId('phone-number')}
				name='phonenumber'
				value={phoneNumberValue}
				onChange={handlePhoneNumberChange}
				mask='(999) 999-9999'
			/>
			<MaskInput
				label='Credit Card Date'
				id={generateUniqueId('credit-card-date')}
				name='creditcardDate'
				value={creditCardDateValue}
				onChange={handleCreditCardDateChange}
				mask='99/99'
			/>
		</Stack>
	);
};

export const WithStates: TextInputStory = () => {
	return (
		<Stack align='start' direction='column' spacing={8} w={480}>
			<TextInputWithLabel label='Idle' placeholder='Idle' />
			<TextInputWithLabel isInvalid label='isInvalid' placeholder='isInvalid' />
			<TextInputWithLabel isDisabled label='isDisabled' placeholder='isDisabled' />
			<TextInputWithLabel isReadOnly label='isReadonly' placeholder='isReadonly' />
		</Stack>
	);
};
