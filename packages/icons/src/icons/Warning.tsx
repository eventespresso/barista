import withClassName from '../withClassName';
import { IconProps } from '../types';

const Warning = (props: IconProps): JSX.Element => {
	return (
		<svg
			aria-hidden='true'
			fill='currentColor'
			height='1.5em'
			stroke='currentColor'
			viewBox='35 45 445 445'
			width='1.5em'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				fill='none'
				strokeWidth='36'
				d='M85.57 446.25h340.86a32 32 0 0028.17-47.17L284.18 82.58c-12.09-22.44-44.27-22.44-56.36 0L57.4 399.08a32 32 0 0028.17 47.17z'
			/>
			<path
				fill='none'
				strokeWidth='36'
				d='M250.26 195.39l5.74 122 5.73-121.95a5.74 5.74 0 00-5.79-6h0a5.74 5.74 0 00-5.68 5.95z'
			/>
			<path d='M256 397.25a20 20 0 1120-20 20 20 0 01-20 20z' />
		</svg>
	);
};

export default withClassName(Warning, 'warning');
