import { is } from 'ramda';

import type { Datetime } from '@eventespresso/constants';

const validSold = ({ sold }: Datetime): boolean => {
	return is(Number, sold);
};

export default validSold;
