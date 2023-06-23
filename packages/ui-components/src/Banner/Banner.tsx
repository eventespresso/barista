import classNames from 'classnames';

import { Banner as BannerAdapter } from '@eventespresso/adapters';
import { Check, ExclamationCircleFilled, InfoCircleFilled, WarningTriangle } from '@eventespresso/icons';
import type { BannerProps } from './types';

import './style.scss';

export const Banner: React.FC<BannerProps> = ({ message, icon, iconProps, status, title, variant, ...props }) => {
	const className = classNames('ee-banner', status && `ee-banner--${status}`, props.className);
	let iconComp: React.ReactNode;
	if (icon) {
		iconComp = icon;
	} else {
		switch (status) {
			case 'error':
				iconComp = <ExclamationCircleFilled className={'ee-banner__icon'} {...iconProps} />;
				break;
			case 'info':
				iconComp = <InfoCircleFilled className={'ee-banner__icon'} {...iconProps} />;
				break;
			case 'success':
				iconComp = <Check className={'ee-banner__icon'} {...iconProps} />;
				break;
			case 'warning':
				iconComp = <WarningTriangle className={'ee-banner__icon'} {...iconProps} />;
				break;
			default:
				iconComp = <InfoCircleFilled className={'ee-banner__icon'} {...iconProps} />;
				break;
		}
	}

	return <BannerAdapter className={className} message={message} icon={iconComp} title={title} variant={variant} />;
};
