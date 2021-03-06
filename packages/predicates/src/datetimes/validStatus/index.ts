import { is } from 'ramda';

import type { Datetime } from '@eventespresso/edtr-services';

const validStatus = ({ status }: Datetime): boolean => is(String, status);

export default validStatus;
