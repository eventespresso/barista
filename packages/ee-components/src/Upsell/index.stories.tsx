import type { Story, Meta } from '@storybook/react/types-6-0';

import { DataProvider } from '@eventespresso/data';
import { ConfigProvider } from '@eventespresso/services';
// import { noop } from '@eventespresso/utils';

import { Upsell } from './Upsell';
import type { UpsellProps } from './types';

export default {
	argTypes: {},
	component: Upsell,
	title: 'Components/Upsell',
} as Meta;

type UpsellStory = Story<UpsellProps>;

const Template: UpsellStory = (args) => (
	<DataProvider>
		<ConfigProvider>
			<Upsell
				{...args}
				altCTAText='Learn more'
				CTAText='Upgrade today'
				image='https://eventespresso.com/wp-content/uploads/2016/10/ee4-attendee-mover-380x250.jpg'
				mainText="The value the plugin and the add-ons we ended up using has provided is much, much higher than the cost, and the support I've received is first rate. I can't recommend Event Espresso highly enough.' -Adam Tervort"
				mainTitle='Get more features with Everything subscription'
				subtitle='Upgrade to Everything Support License'
			/>
		</ConfigProvider>
	</DataProvider>
);

export const WithBaseTemplate: UpsellStory = Template.bind({});
WithBaseTemplate.args = { template: 'base' };

export const WithBaseTemplateAndLeftImagePosition: UpsellStory = Template.bind({});
WithBaseTemplateAndLeftImagePosition.args = { imagePosition: 'left', template: 'base' };

export const WithBaseTemplateAndRightImagePosition: UpsellStory = Template.bind({});
WithBaseTemplateAndRightImagePosition.args = { imagePosition: 'right', template: 'base' };

export const WithBaseTemplateAndTopImagePosition: UpsellStory = Template.bind({});
WithBaseTemplateAndTopImagePosition.args = { imagePosition: 'top', template: 'base' };

export const WithBaseTemplateAndBottomImagePosition: UpsellStory = Template.bind({});
WithBaseTemplateAndBottomImagePosition.args = { imagePosition: 'bottom', template: 'base' };
