import classNames from 'classnames';

import { Popover as PopoverAdapter, PopoverProps } from '@eventespresso/adapters';

import './style.scss';

export const Popover: React.FC<PopoverProps> = (props) => {
	const className = classNames('ee-popover', props.className);

	return (
		<div className={className}>
			<PopoverAdapter {...props} contentClassName='ee-popover__content' />
		</div>
	);
};
