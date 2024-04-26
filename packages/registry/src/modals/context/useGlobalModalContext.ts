import { useContext } from 'react';

import { GlobalModalContext } from './GlobalModalProvider';
import type { GlobalModalManager } from './types';

const useGlobalModalContext = <D = Record<string, any>>(): GlobalModalManager<D> => {
	return useContext(GlobalModalContext) as GlobalModalManager<D>;
};

export default useGlobalModalContext;
