import type { Story, Meta } from '@storybook/react/types-6-0';

import { Toaster } from './Toaster';
import type { ToasterProps } from './types';

export default {
	argTypes: {},
	component: Toaster,
	title: 'Components/Toaster',
} as Meta;

type ToasterStory = Story<ToasterProps>;

const Template: ToasterStory = (args) => <Toaster {...args} />;

export const Default: ToasterStory = Template.bind({});
Default.args = { type: 'default' };

export const Loading: ToasterStory = Template.bind({});
Loading.args = { type: 'loading' };

export const Info: ToasterStory = Template.bind({});
Info.args = { type: 'info' };

export const Success: ToasterStory = Template.bind({});
Success.args = { type: 'success' };

export const Warning: ToasterStory = Template.bind({});
Warning.args = { type: 'warning' };

export const Error: ToasterStory = Template.bind({});
Error.args = { type: 'error' };
