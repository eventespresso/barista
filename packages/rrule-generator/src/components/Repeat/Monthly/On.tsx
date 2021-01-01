import { useCallback } from 'react';
import { range } from 'ramda';

import { __ } from '@eventespresso/i18n';
import { Divider, Radio, Select } from '@eventespresso/ui-components';

import { useRRuleState } from '../../../hooks';
import { OnChangeSelect } from '../../types';
import { getNumericValue } from '../../../utils';
import type { OnProps } from '../types';

const On: React.FC<OnProps> = ({ id, isTheOnlyMode, onChangeMode }) => {
	const {
		repeat: { monthly },
		setRepeatDay,
	} = useRRuleState();

	const isActive = monthly?.mode === 'ON';
	const on = monthly?.on;

	const onChangeDay = useCallback<OnChangeSelect>(
		(event) => {
			setRepeatDay('monthly', 'on', getNumericValue(event.target.value));
		},
		[setRepeatDay]
	);

	return (
		<div className='rrule-generator__on'>
			{!isTheOnlyMode && (
				<label className='rrule-generator__labelled-input'>
					<Radio
						aria-label={__('Repeat monthly on')}
						id={id}
						isChecked={isActive}
						name={id}
						onChange={onChangeMode}
						value='ON'
					/>
					<span>{__('on day')}</span>
				</label>
			)}

			<Divider orientation='vertical' size='micro' />

			<Select
				aria-label={__('Repeat monthly on a day')}
				id={`${id}-day`}
				name={`${id}-day`}
				isDisabled={!isActive}
				onBlur={onChangeDay}
				onChange={onChangeDay}
				value={on.day}
				width='auto'
			>
				{range(1, 32).map((day) => (
					<option key={day} value={day}>
						{day}
					</option>
				))}
			</Select>
		</div>
	);
};

export default On;
