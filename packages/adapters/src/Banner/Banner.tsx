import { Alert as ChakraAlert, AlertTitle, AlertDescription, Box } from '@chakra-ui/react';

import type { BannerProps } from './types';

export const Banner: React.FC<BannerProps> = ({ className, message, icon, title, variant }) => {
	return (
		<ChakraAlert className={className} variant={variant}>
			{icon}
			<Box className={'ee-banner__content'}>
				{title && <AlertTitle className={'ee-banner__title'}>{title}</AlertTitle>}
				{message && <AlertDescription className={'ee-banner__message'}>{message}</AlertDescription>}
			</Box>
		</ChakraAlert>
	);
};
