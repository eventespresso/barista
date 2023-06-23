import type { BannerProps as BannerAdapterProps } from '@eventespresso/adapters';
import type { IconProps } from '@eventespresso/icons';

export interface BannerProps extends BannerAdapterProps {
	iconProps?: IconProps;
}
