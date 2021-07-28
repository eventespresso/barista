import { useOutsideClick as useOutsideClickAdapter } from '@chakra-ui/react';

export const useOnClickOutside: typeof useOutsideClickAdapter = (props) => {
	return useOutsideClickAdapter(props);
};
