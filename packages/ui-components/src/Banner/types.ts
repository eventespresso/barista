import type { BannerProps as BannerAdapterProps } from '@eventespresso/adapters';
import type { IconProps } from '@eventespresso/icons';

export interface BannerProps extends BannerAdapterProps {
	iconProps?: IconProps;
}

export interface BannerIconProps extends Pick<BannerProps, 'icon' | 'iconProps' | 'status'> {}
