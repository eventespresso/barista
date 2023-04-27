import withClassName from '../withClassName';
import { IconProps } from '../types';

const Calendar = (props: IconProps): JSX.Element => {
	return (
		<svg
			aria-hidden='true'
			height='1.5em'
			viewBox='-2 -1.5 23 23'
			width='1.5em'
			xmlns='http://www.w3.org/2000/svg'
			className='ee-svg--calendar'
			{...props}
		>
			<path d='M0 2v18h20V2zm2 4.5h16V18H2zM15.5 0v8h-1.38l-2.58 2.06.8 1.2.92-.74c.12-.1.32-.28.6-.56l-.04.84v5.7h1.68zm-6 10c0-.6-.24-1.08-.74-1.42-.48-.34-1.16-.52-2-.52-1.04 0-1.92.26-2.66.8l.8 1.2c.34-.22.64-.38.92-.46.28-.1.54-.14.82-.14.76 0 1.16.3 1.16.92 0 .4-.14.7-.44.86s-.76.24-1.4.24h-.62v1.32h.62c.68 0 1.18.08 1.5.24.3.16.46.44.46.82 0 .44-.14.74-.4.94-.28.2-.7.3-1.26.3-.38 0-.76-.06-1.14-.16s-.72-.24-1.04-.4v1.48c.68.3 1.48.44 2.36.44 1.06 0 1.88-.22 2.44-.66.58-.44.86-1.04.86-1.84 0-.54-.18-.96-.52-1.28s-.84-.52-1.48-.6v-.04c.54-.12.98-.38 1.3-.74.3-.36.46-.78.46-1.3zM4 0h2v2H4V0zm10 0h2v2h-2V0z' />
		</svg>
	);
};

export default withClassName(Calendar, 'calendar');
