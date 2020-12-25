import { Alert as ChakraAlert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';

import type { BannerProps } from './types';

export const Banner: React.FC<BannerProps> = ({
	children,
	className,
	description,
	icon,
	iconProps,
	title,
	variant,
}) => {
	return (
		<ChakraAlert className={className} variant={variant}>
			{icon ? icon : <AlertIcon className={'ee-banner__icon'} {...iconProps} />}

			{title && <AlertTitle className={'ee-banner__title'}>{title}</AlertTitle>}

			{description && <AlertDescription className={'ee-banner__desc'}>{description}</AlertDescription>}

			{children && children}
		</ChakraAlert>
	);
};
