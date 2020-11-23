import React from 'react';
import classNames from 'classnames';

import { Collapsible } from '../';

import type { InlineMessageProps } from './types';

import './style.scss';

export const InlineNotification: React.FC<InlineMessageProps> = ({ icon, id, message, type, variant }) => {
	const className = classNames(
		'ee-inline-notification',
		type && `ee-inline-notification--type-${type}`,
		variant && `ee-inline-notification--variant-${variant}`
	);

	return (
		<Collapsible show={Boolean(message?.length)}>
			<div aria-live='polite' className={className} id={id}>
				{icon}
				<p>{message}</p>
			</div>
		</Collapsible>
	);
};
