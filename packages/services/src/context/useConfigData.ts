import { Factory } from '@eventespresso/config';
import { useMemoStringify } from '@eventespresso/utils';

// TODO: try strict type here...

export const useConfigData = () => {
	return useMemoStringify(Factory.init().make());
};
