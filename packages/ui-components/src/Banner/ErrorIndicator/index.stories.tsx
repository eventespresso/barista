import type { Story, Meta } from '@storybook/react/types-6-0';

import { ErrorIndicator } from './';

import type { BannerProps } from '@eventespresso/adapters';

export default {
	argTypes: {},
	component: ErrorIndicator,
	title: 'Components/Banner/ErrorIndicator',
} as Meta;

type BannerStory = Story<BannerProps>;

export const Default: BannerStory = (args) => <ErrorIndicator {...args} description='description' title='title' />;
