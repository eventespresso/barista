import { useMemo } from 'react';
import * as R from 'ramda';

import type { RRuleConfig } from '@eventespresso/rrule-generator';

import { useFormState, useRRuleSetFromState } from '../../data';
import { getMaxDatesLimit } from '../../utils';
import type { PatternType } from './types';

const useRRuleLimits = (type: PatternType): Pick<RRuleConfig, 'maxEndDate' | 'maxExecutions'> => {
	const { rRule, exRule, exDates } = useFormState();

	const rule = type === 'exclusion' ? exRule : rRule;

	// Manually excluded dates (exDates) will increase the number of allowed dates
	const maxExecutions = getMaxDatesLimit(rule) + exDates.length;

	// replace end date with count to set the limit on number of dates
	const rRuleToUse = rule.replace(/UNTIL=[^;]+?;/, `COUNT=${maxExecutions};`);

	const rruleSet = useRRuleSetFromState(rRuleToUse);

	let maxEndDate: Date;
	if (type === 'recurrence') {
		const generatedDates = rruleSet.all((date, i) => {
			return i < maxExecutions + 1;
		});

		maxEndDate = R.last(generatedDates);
	}

	return useMemo(
		() => ({
			maxEndDate,
			maxExecutions,
		}),
		[maxEndDate, maxExecutions]
	);
};

export default useRRuleLimits;
