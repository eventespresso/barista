import { useCallback, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { RRuleConfig } from '../types';
import { StateInitializer, RRuleState } from './types';
import { computeRRuleFromString } from '../utils';

/**
 * Initializes the state dynamically by using the config.
 */
const useInitialState = (config: RRuleConfig, rRuleString?: string): StateInitializer => {
	const state = useMemo<RRuleState>(
		() => ({
			hash: uuidv4(),
			start: {
				date: new Date(),
			},
			repeat: {
				frequency: config?.frequencies?.[0] || 'YEARLY',
				yearly: {
					mode: config?.yearlyModes?.[0] || 'ON',
					on: {
						month: 'Jan',
						day: 1,
					},
					onThe: {
						month: 'Jan',
						day: 'MO',
						which: 'FIRST',
					},
				},
				monthly: {
					mode: config?.monthlyModes?.[0] || 'ON',
					interval: 1,
					on: {
						day: 1,
					},
					onThe: {
						day: 'MO',
						which: 'FIRST',
					},
				},
				weekly: {
					interval: 1,
					days: {
						MO: false,
						TU: false,
						WE: false,
						TH: false,
						FR: false,
						SA: false,
						SU: false,
					},
				},
				daily: {
					interval: 1,
				},
				hourly: {
					interval: 1,
				},
			},
			end: {
				mode: config?.endModes?.[0] || 'NEVER',
				after: 1,
				date: new Date(),
			},
		}),
		[config?.endModes, config?.frequencies, config?.monthlyModes, config?.yearlyModes]
	);

	return useCallback<StateInitializer>(
		(initialState) => {
			// if rRule string is provided, use it to generate initial state
			const data = rRuleString ? computeRRuleFromString(state, rRuleString) : state;

			return { ...initialState, ...data };
		},
		[rRuleString, state]
	);
};

export default useInitialState;
