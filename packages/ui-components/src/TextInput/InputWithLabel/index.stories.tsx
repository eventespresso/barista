import type { Story, Meta } from '@storybook/react/types-6-0';
import { Stack } from '@eventespresso/adapters';

import { TextInput } from '../';
import { InputWithLabel, InputWithLabelProps } from './';

export default {
	component: InputWithLabel,
	title: 'Components/TextInput/InputWithLabel',
} as Meta;

type InputWithLabelStory = Story<InputWithLabelProps>;

const Template: InputWithLabelStory = (args) => {
	return (
		<Stack align='start' direction='column' spacing={16} w={480}>
			<InputWithLabel {...args} label='label'>
				{<TextInput disabled={args?.disabled} />}
			</InputWithLabel>
		</Stack>
	);
};

export const Default: InputWithLabelStory = Template.bind({});

export const Disabled: InputWithLabelStory = Template.bind({});
Disabled.args = { disabled: true };

export const RightPositionedLabel: InputWithLabelStory = Template.bind({});
RightPositionedLabel.args = { labelPosition: 'right' };

export const LeftPositionedLabel: InputWithLabelStory = Template.bind({});
LeftPositionedLabel.args = { labelPosition: 'left' };
