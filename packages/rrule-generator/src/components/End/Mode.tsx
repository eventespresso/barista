import React, { useCallback } from 'react';
import { __ } from '@eventespresso/i18n';

import { ModeProps } from './types';
import { EndMode } from '../../types';
import { useRRuleConfig } from '../../hooks';

const modeLabels: { [key in EndMode]: string } = {
	AFTER: __('After'),
	NEVER: __('Never'),
	ON_DATE: __('On date'),
};

const Mode: React.FC<ModeProps> = ({ id, mode, onChange }) => {
	const { endModes } = useRRuleConfig();

	const onChangeMode = useCallback(
		(event: React.ChangeEvent<HTMLSelectElement>) => {
			onChange(event.target.value as EndMode);
		},
		[onChange]
	);

	return (
		<select
			id={id}
			className='rrule-generator__form-control rrule-generator__form-control--medium-width rrule-generator__select'
			value={mode}
			name={id}
			onChange={onChangeMode}
		>
			{endModes.map((endMode) => {
				return (
					<option key={endMode} value={endMode}>
						{modeLabels?.[endMode]}
					</option>
				);
			})}
		</select>
	);
};

export default Mode;
