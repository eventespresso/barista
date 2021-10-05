import { useCallback } from 'react';

import { __ } from '@eventespresso/i18n';
import { Divider, Select } from '@eventespresso/ui-components';

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
		<>
			<Select
				className='rrule-generator__end-after'
				id={id}
				value={mode}
				name={id}
				onBlur={onChangeMode}
				onChange={onChangeMode}
				width='auto'
			>
				{endModes.map((endMode) => {
					return (
						<option key={endMode} value={endMode}>
							{modeLabels?.[endMode]}
						</option>
					);
				})}
			</Select>
			<Divider orientation='vertical' size='tiny' />
		</>
	);
};

export default Mode;
