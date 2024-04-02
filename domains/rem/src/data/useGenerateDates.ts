import * as R from 'ramda';
import { formatISO, parseISO } from 'date-fns';

import { useMemoStringify } from '@eventespresso/utils';

import useFormState from './useFormState';
import { getDatesLimit } from '../utils';
import type { GeneratedDate } from '../ui/generatedDates/types';
import useRRuleSetFromState from './useRRuleSetFromState';

export const useGenerateDates = (includeExDates?: boolean): Array<GeneratedDate> => {
	const { rRule, exDates, rDates } = useFormState();

	let result: Array<GeneratedDate> = [];

	const rruleSet = useRRuleSetFromState();

	if (rRule) {
		// We need to adjust the number of exDates in total dates generated
		// to avoid they being excluded from total count
		const datesLimit = getDatesLimit(rRule) - exDates.length + rDates.length;

		const rruleGeneratedDates = rruleSet.all((date, i) => {
			return i < datesLimit;
		});

		let generatedDates: Array<GeneratedDate> = rruleGeneratedDates.map<GeneratedDate>((date) => {
			const ISOStr = formatISO(date);
			const type = rDates.includes(ISOStr) ? 'rDate' : 'gDate';

			return { date, ISOStr, type };
		});

		if (includeExDates) {
			const excludedDates: Array<GeneratedDate> = exDates.map<GeneratedDate>((dateStr) => {
				const date = parseISO(dateStr);
				const type = 'exDate';

				return { date, ISOStr: dateStr, type };
			});
			generatedDates = [...generatedDates, ...excludedDates];
		}

		result = R.sortBy(R.prop('ISOStr'), generatedDates);
	}

	return useMemoStringify(result);
};

export default useGenerateDates;
