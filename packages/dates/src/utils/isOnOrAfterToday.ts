import { compareAsc } from 'date-fns';

import { prepDatesForComparison } from './misc';
import type { SingleDateComparisonFunc } from './types';
import { NOW } from '../constants';

/**
 * returns:
 * 		 true if firstDate is today or after today
 *      false if firstDate is before today
 */
const isOnOrAfterToday: SingleDateComparisonFunc = (firstDate, considerTime = false) => {
	const [parsedFirstDate, parsedSecondDate] = prepDatesForComparison(firstDate, NOW, considerTime);
	return compareAsc(parsedFirstDate, parsedSecondDate) > -1;
};

export default isOnOrAfterToday;
