import * as React from 'react';
import withEnhance from '../withEnhance';
import { IconProps } from '../types';

const SvgLink = (props: IconProps): JSX.Element => {
	return (
		<svg
			aria-hidden='true'
			className='link_svg__css-thzv76 link_svg__dashicon link_svg__dashicons-admin-links link_svg__espresso-icon'
			height={'1.25em'}
			viewBox={'0 0 20 20'}
			width={'1.25em'}
			{...props}
		>
			<path d='M17.74 2.76a4.321 4.321 0 010 6.1l-1.53 1.52c-1.12 1.12-2.7 1.47-4.14 1.09l2.62-2.61.76-.77.76-.76c.84-.84.84-2.2 0-3.04a2.13 2.13 0 00-3.04 0l-.77.76-3.38 3.38c-.37-1.44-.02-3.02 1.1-4.14l1.52-1.53a4.321 4.321 0 016.1 0zM8.59 13.43l5.34-5.34c.42-.42.42-1.1 0-1.52-.44-.43-1.13-.39-1.53 0l-5.33 5.34c-.42.42-.42 1.1 0 1.52.44.43 1.13.39 1.52 0zm-.76 2.29l4.14-4.15c.38 1.44.03 3.02-1.09 4.14l-1.52 1.53a4.321 4.321 0 01-6.1 0 4.321 4.321 0 010-6.1l1.53-1.52c1.12-1.12 2.7-1.47 4.14-1.1l-4.14 4.15c-.85.84-.85 2.2 0 3.05.84.84 2.2.84 3.04 0z' />
		</svg>
	);
};

export default withEnhance(SvgLink);
