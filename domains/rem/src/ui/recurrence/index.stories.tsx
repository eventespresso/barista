import type { Meta } from '@storybook/react/types-6-0';

import { withContext } from '../../context';
import { PatternEditor } from './';

export default {
	argTypes: {},
	component: PatternEditor,
	title: 'Components/PatternEditor',
} as Meta;

export const Default = withContext((args) => <PatternEditor {...args} />);

export const DefaultRTL = withContext((args) => (
	<div dir='rtl'>
		<PatternEditor {...args} />
	</div>
));
