import type { Story, Meta } from '@storybook/react/types-6-0';

import { Banner } from './';
import type { BannerProps } from '@eventespresso/adapters';

export default {
	argTypes: {},
	component: Banner,
	title: 'Components/Banner',
} as Meta;

type BannerStory = Story<BannerProps>;
const message =
	'Bacon ipsum dolor amet porchetta meatball turducken landjaeger beef. Pork belly ground round pig porchetta alcatra kielbasa tail swine burgdoggen frankfurter. ';

const Template: BannerStory = (args) => <Banner {...args} message={message} variant='subtle' />;

export const Error: BannerStory = Template.bind({});
Error.args = { status: 'error', title: 'error banner' };

export const Info: BannerStory = Template.bind({});
Info.args = { status: 'info', title: 'info banner' };

export const Success: BannerStory = Template.bind({});
Success.args = { status: 'success', title: 'success banner' };

export const Warning: BannerStory = Template.bind({});
Warning.args = { status: 'warning', title: 'warning banner' };
