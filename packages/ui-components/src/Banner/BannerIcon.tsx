import { Check, ExclamationCircleFilled, InfoCircleFilled, WarningTriangle } from '@eventespresso/icons';
import type { BannerIconProps } from './types';

export const BannerIcon: React.FC<BannerIconProps> = ({ icon, iconProps, status }) => {
	if (icon) return icon;
	switch (status) {
		case 'error':
			return <ExclamationCircleFilled className={'ee-banner__icon'} {...iconProps} />;
		case 'info':
			return <InfoCircleFilled className={'ee-banner__icon'} {...iconProps} />;
		case 'success':
			return <Check className={'ee-banner__icon'} {...iconProps} />;
		case 'warning':
			return <WarningTriangle className={'ee-banner__icon'} {...iconProps} />;
		default:
			return <InfoCircleFilled className={'ee-banner__icon'} {...iconProps} />;
	}
};
