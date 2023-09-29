import { useMemo } from 'react';
import { isDev } from '@eventespresso/constants';
import { useIsRehydrated } from '@eventespresso/data';
import { useStatus, TypeName } from '@eventespresso/services';

const useNotifications = () => {
	const { isLoaded } = useStatus();
	const [isRehydrated] = useIsRehydrated();

	const readyTypes = useMemo(() => {
		const types: string[] = [];
		if (!isDev || !isRehydrated) {
			return [];
		}
		for (const key in TypeName) {
			if (isLoaded(TypeName[key])) {
				types.push(TypeName[key]);
			}
		}
		return types;
	}, [isLoaded, isRehydrated]);

	return useMemo(
		() => ({
			dev: {
				readyTypes,
			},
		}),
		[readyTypes]
	);
};

export default useNotifications;
