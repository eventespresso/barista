import { useMemo } from 'react';

import { RRuleGenerator as RRuleGeneratorUI, RRuleConfig } from '@eventespresso/rrule-generator';

import useRRuleLimits from './useRRuleLimits';
import type { RRuleGeneratorProps } from './types';

const defaultConfig: RRuleConfig = {
	frequencies: ['YEARLY', 'MONTHLY', 'WEEKLY', 'DAILY'],
	endModes: ['AFTER', 'ON_DATE'],
	enableTimepicker: false,
};

const RRuleGenerator: React.FC<RRuleGeneratorProps> = ({ id, rRuleString, onChange, type }) => {
	const limitsConfig = useRRuleLimits(type);

	const config = useMemo(() => ({ ...defaultConfig, ...limitsConfig }), [limitsConfig]);

	return <RRuleGeneratorUI config={config} id={id} onChange={onChange} value={rRuleString} />;
};

export default RRuleGenerator;
