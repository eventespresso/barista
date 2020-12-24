import React, { useCallback } from 'react';
import { __ } from '@eventespresso/i18n';

import { NumberInput } from '../../../../components/src/NumberInput';
import { AfterProps } from './types';
import { useRRuleConfig } from '../../hooks';

const After: React.FC<AfterProps> = ({ id, after, onChange }) => {
	const onChangeAfter = useCallback(
		(value) => {
			onChange(value);
		},
		[onChange]
	);

	const { maxExecutions } = useRRuleConfig();

	return (
		<label className='rrule-generator__labelled-input'>
			<NumberInput
				aria-label={__('End after')}
				id={id}
				max={maxExecutions}
				name={id}
				onChange={onChangeAfter}
				showStepper={false}
				value={after}
				visibleDigits={3}
			/>
			<span>{__('occurrences')}</span>
		</label>
	);
};

export default After;
