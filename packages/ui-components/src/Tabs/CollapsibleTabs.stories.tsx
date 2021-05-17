import type { Meta } from '@storybook/react/types-6-0';

import { CalendarAlt, Edit } from '@eventespresso/icons';
import { CollapsibleTabs } from './CollapsibleTabs';
import { CollapsibleTabsProps } from './types';

export default {
	component: CollapsibleTabs,
	title: 'Components/CollapsibleTabs',
} as Meta;

const tabs: CollapsibleTabsProps['tabs'] = [
	{
		id: 'dates-tickets',
		title: 'Dates and Tickets',
		icon: <CalendarAlt />,
	},
	{
		id: 'post-content',
		title: 'Post Content',
		icon: <Edit />,
	},
];

const renderPanel: CollapsibleTabsProps['renderPanel'] = ({ id }) => {
	switch (id) {
		case 'dates-tickets':
			return 'Event dates content here';

		case 'post-content':
			return 'Post content here';

		default:
			return null;
	}
};

export const Default = () => <CollapsibleTabs tabs={tabs} renderPanel={renderPanel} />;
