import classNames from 'classnames';

import { Banner as BannerAdapter } from '@eventespresso/adapters';
import { BannerIcon } from './BannerIcon';
import type { BannerProps } from './types';

import './style.scss';

export const Banner: React.FC<BannerProps> = ({ message, icon, iconProps, status, title, variant, ...props }) => {
	const className = classNames('ee-banner', status && `ee-banner--${status}`, props.className);
	const iconComp = <BannerIcon icon={icon} iconProps={iconProps} status={status} />;
	return <BannerAdapter className={className} message={message} icon={iconComp} title={title} variant={variant} />;
};
