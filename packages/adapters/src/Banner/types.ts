import type { AlertProps } from '@chakra-ui/react';

export interface BannerProps extends Pick<AlertProps, 'className' | 'status' | 'variant'> {
	icon?: React.ReactNode;
	message?: string | React.ReactNode;
	title: string;
}
