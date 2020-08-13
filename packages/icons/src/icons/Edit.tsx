import * as React from 'react';
import withEnhance from '../withEnhance';
import { IconProps } from '../types';

const SvgEdit = (props: IconProps): JSX.Element => {
	return (
		<svg width='1.25em' height='1.25em' viewBox='0 0 20 20' {...props}>
			<path d='M13.89 3.39l2.71 2.72c.46.46.42 1.24.03 1.64l-8.01 8.02-5.56 1.16 1.16-5.58s7.6-7.63 7.99-8.03c.39-.39 1.22-.39 1.68.07zm-2.73 2.79l-5.59 5.61 1.11 1.11 5.54-5.65zm-2.97 8.23l5.58-5.6-1.07-1.08-5.59 5.6z' />
		</svg>
	);
};

export default withEnhance(SvgEdit);
