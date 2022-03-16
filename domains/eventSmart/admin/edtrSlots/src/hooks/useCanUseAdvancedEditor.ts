import { useCurrentUserCan } from '@eventespresso/services';
import { USE_ADVANCED_EDITOR } from '@eventespresso/constants';

export const useCanUseAdvancedEditor = (): boolean => {
	const currentUserCan = useCurrentUserCan();

	return currentUserCan(USE_ADVANCED_EDITOR);
};
