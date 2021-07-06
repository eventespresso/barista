import withClassName from '../withClassName';
import { IconProps } from '../types';

const Edit = (props: IconProps): JSX.Element => {
	return (
		<svg
			data-icon='control'
			fill='currentColor'
			aria-hidden='true'
			height='1.5em'
			width='1.5em'
			viewBox='0 0 24 24'
			className='ee-svg--edit'
			{...props}
		>
			<g fill='none' fillOpacity='0' stroke='currentColor' strokeWidth={2}>
				<path d='M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7' />
				<path d='M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z' />
			</g>
		</svg>
	);
};

export default withClassName(Edit, 'edit');
