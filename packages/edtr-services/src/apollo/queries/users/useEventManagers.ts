import { useMemoStringify } from '@eventespresso/utils';

import type { EventManager } from '@eventespresso/constants';

const useEventManagers = (): Array<EventManager> => {
	return useMemoStringify(window.eventEspressoData?.eventEditor?.eventManagers || []);
};

export default useEventManagers;
