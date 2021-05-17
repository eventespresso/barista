import type { Meta } from '@storybook/react/types-6-0';

import { Calendar, CalendarOutlined, Repeat, Ticket } from '@eventespresso/icons';
import { Steps, Step } from './index';

export default {
	component: Steps,
	title: 'Components/Steps',
} as Meta;

const firstStepIcon = () => <Repeat noMargin size='big' />;

export const Default = () => (
	<Steps compact current={0} showStepNumber>
		<Step description={'define how recurring dates are generated'} icon={firstStepIcon} title={'Pattern Editor'} />
		<Step description={'primary information for generated dates'} icon={Calendar} title={'Date Details'} />
		<Step description={'create or add tickets for generated dates'} icon={Ticket} title={'Tickets'} />
		<Step
			description={'confirm final dates list and add or remove exceptions'}
			icon={CalendarOutlined}
			title={'Generated Dates'}
		/>
	</Steps>
);
