import * as React from 'react';
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';

import { ThemeProvider, Box } from '@eventespresso/adapters';

// default styles
import '@eventespresso/styles/src/themes/default/index.scss';

const withTheme = (StoryFn) => (
	<ThemeProvider>
		<Box
			id='story-wrapper'
			// WP Admin background color
			backgroundColor='#f0f0f1'
			p='10px'
		>
			<StoryFn />
		</Box>
	</ThemeProvider>
);

export const decorators = [withTheme];

export const parameters = {
	viewport: {
		viewports: MINIMAL_VIEWPORTS,
	},
};
