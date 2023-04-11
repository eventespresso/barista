import { useState, useCallback } from 'react';
import type { Story, Meta } from '@storybook/react/types-6-0';

import { TextInput, MaskInput } from '../';
import { TextInputProps } from '@eventespresso/adapters';

export default {
	title: 'Components/TextInput',
} as Meta;

type TextInputStory = Story<TextInputProps>;
const generateUniqueId = (prefix: string) => `${prefix}-${Math.random().toString(36).substr(2, 9)}`;

export const Basic: TextInputStory = () => <TextInput placeholder='Basic input' />;

export const Controlled: TextInputStory = () => {
	const [value, setValue] = useState('Starting...');
	const handleChange = useCallback<TextInputProps['onChange']>((event) => setValue(event.target.value), []);

	return (
		<>
			<TextInput value={value} onChange={handleChange} placeholder='Controlled input' />
			<pre>{JSON.stringify(value, null, 2)}</pre>
		</>
	);
};

export const WithInputMask: TextInputStory = () => {
	const [creditCardValue, setCreditCardValue] = useState<string>('');
	const handleCreditCardChange = useCallback<TextInputProps['onChange']>(
		(event) => setCreditCardValue(event.target.value),
		[]
	);

	const [phoneNumberValue, setPhoneNumberValue] = useState<string>('');
	const handlePhoneNumberChange = useCallback<TextInputProps['onChange']>(
		(event) => setPhoneNumberValue(event.target.value),
		[]
	);

	const [creditCardDateValue, setCreditCardDateValue] = useState<string>('');
	const handleCreditCardDateChange = useCallback<TextInputProps['onChange']>(
		(event) => setCreditCardDateValue(event.target.value),
		[]
	);

	return (
		<>
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
		</>
	);
};

export const WithStates: TextInputStory = () => {
	return (
		<>
			<TextInput placeholder='Idle' />
			<TextInput isInvalid placeholder='isInvalid' />
			<TextInput isDisabled placeholder='isDisabled' />
			<TextInput isReadOnly placeholder='isReadonly' />
		</>
	);
};
