import type { Story, Meta } from '@storybook/react/types-6-0';

import { Groups } from '@eventespresso/icons';
import { TextLink } from './';

export default {
	argTypes: {},
	component: TextLink,
	title: 'Components/Button/TextLink',
} as Meta;

type TextLinkStory = Story<React.ComponentProps<typeof TextLink>>;

const Template: TextLinkStory = (args) => (
	<TextLink {...args} href='https://eventespresso.com/'>
		Link
	</TextLink>
);

export const Default: TextLinkStory = Template.bind({});

export const ExternalLink: TextLinkStory = Template.bind({});
ExternalLink.args = { showExternalIcon };

export const WithIcon: TextLinkStory = Template.bind({});
WithIcon.args = { icon: <Groups /> };

export const WithTooltip: TextLinkStory = Template.bind({});
WithTooltip.args = { tooltip: 'tooltip text' };
