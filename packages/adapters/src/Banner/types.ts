import type { AlertProps, IconProps } from '@chakra-ui/core';

export interface BannerProps extends Pick<AlertProps, 'className' | 'status' | 'variant'> {
	description?: string;
	icon?: React.ReactNode;
	iconProps?: IconProps;
	title: string;
}
