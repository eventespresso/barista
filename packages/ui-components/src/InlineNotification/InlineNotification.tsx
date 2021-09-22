import classNames from 'classnames';

import { Collapsible } from '../';

import type { InlineMessageProps } from './types';

import './style.scss';

export const InlineNotification: React.FC<InlineMessageProps> = ({ 
	icon, 
	id, 
	message, 
	type, 
	variant, 
	wrapperClassName 
}) => {
	const className = classNames(
		'ee-inline-notification',
		type && `ee-inline-notification--type-${type}`,
		variant && `ee-inline-notification--variant-${variant}`
	);
	const wrapperClass = classNames('ee-inline-notification__wrapper', wrapperClassName);

	return (
		<Collapsible show={Boolean(message?.length)} className={wrapperClass}>
			<div aria-live='polite' className={className} id={id}>
				{icon}
				<p>{message}</p>
			</div>
		</Collapsible>
	);
};
