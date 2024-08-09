import { useToast } from '@chakra-ui/react';

import type { IToastOptions } from './types';

export const useCustomToast = () => {
	const toast = useToast();

	const successToast = ({ title, description, duration, isClosable, position }: IToastOptions) => {
		toast({
			title: title,
			description: description,
			duration: duration ?? 9000,
			isClosable: isClosable ?? true,
			position: position ?? 'bottom-right',
			status: 'success',
		});
	};

	return { successToast };
};
