import { useState, useCallback } from 'react';
import type { Story, Meta } from '@storybook/react/types-6-0';

import { Divider, TextInput } from '../';
import { Stack, TextInputProps } from '@eventespresso/adapters';

export default {
	title: 'Components/TextInput',
} as Meta;

type TextInputStory = Story<TextInputProps>;

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

export const WithStates: TextInputStory = () => (
	<Stack align='start'>
		<TextInput placeholder='Idle' />
		<Divider size='small' />
		<TextInput isInvalid placeholder='isInvalid' />
		<Divider size='small' />
		<TextInput isDisabled placeholder='isDisabled' />
		<Divider size='small' />
		<TextInput isReadOnly placeholder='isReadonly' />
	</Stack>
);
