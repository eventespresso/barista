import type { Datetime } from '@eventespresso/edtr-services';
import { isBooleanTrue, isInfinite } from '@eventespresso/utils';

const isSoldOut = (date: Datetime): boolean =>
	isBooleanTrue(date.isSoldOut) || (!isInfinite(date.capacity) && date.capacity > -1 && date.capacity <= date.sold);

export default isSoldOut;
