import { useMemo } from 'react';
import { useCurrentUser } from '@eventespresso/data';
import type { User } from '@eventespresso/constants';

const useUserCapabilities = (): User['capabilities'] => {
	const currentUser = useCurrentUser();

	return useMemo(() => currentUser?.capabilities || [], [currentUser?.capabilities]);
};

export default useUserCapabilities;
