import withClassName from '../withClassName';
import { IconProps } from '../types';

const Calculator = (props: IconProps): JSX.Element => {
	return (
		<svg
			aria-hidden='true'
			height='1.5em'
			viewBox='-1 -1 22 22'
			width='1.5em'
			xmlns='http://www.w3.org/2000/svg'
			className='ee-svg--calculator'
			{...props}
		>
			<path d='M3 0v20h14V0H3zm2.5 2.5h9v2h-9v-2zm0 4h2v1.75h-2V6.5zm3.5 0h2v1.75H9V6.5zm3.5 0h2v1.75h-2V6.5zm-7 3h2v1.75h-2V9.5zm3.5 0h2v1.75H9V9.5zm3.5 0h2v1.75h-2V9.5zm-7 3h2v1.75h-2V12.5zm3.5 0h2v1.75H9V12.5zm3.5 0h2v1.75h-2V12.5zm-7 3h2v1.75h-2V15.5zm3.5 0h2v1.75H9V15.5zm3.5 0h2v1.75h-2V15.5z' />
		</svg>
	);
};

export default withClassName(Calculator, 'calculator');
