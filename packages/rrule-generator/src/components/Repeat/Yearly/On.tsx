import { useCallback } from 'react';

import { __ } from '@eventespresso/i18n';
import { parse, getDaysInMonth } from 'date-fns';
import { range } from 'ramda';

import { NOW } from '@eventespresso/constants';
import { Divider, Radio, Select, Stack } from '@eventespresso/ui-components';

import { MONTHS } from '../../../constants';
import { useRRuleState } from '../../../hooks';
import type { OnChangeSelect } from '../../types';
import type { Month } from '../../../types';
import type { OnProps } from '../types';

const On: React.FC<OnProps> = ({ id, isTheOnlyMode, onChangeMode }) => {
	const {
		repeat: { yearly },
		setRepeatMonth,
		setRepeatDay,
	} = useRRuleState();

	const isActive = yearly?.mode === 'ON';
	const on = yearly?.on;
	// parse 'Jan', 'Feb'
	const date = parse(on?.month, 'MMM', NOW);
	// number of days in the selected month
	const daysInMonth = getDaysInMonth(date);

	const onChangeMonth = useCallback<OnChangeSelect>(
		(event) => {
			const value = event.target.value as Month;
			setRepeatMonth('on', value);
		},
		[setRepeatMonth]
	);

	const onChangeDay = useCallback<OnChangeSelect>(
		(event) => {
			const value = +event.target.value;
			setRepeatDay('yearly', 'on', value);
		},
		[setRepeatDay]
	);

	return (
		<Stack className='rrule-generator__on'>
			{!isTheOnlyMode && (
				<Radio
					aria-label={__('Repeat yearly on')}
					id={id}
					isChecked={isActive}
					name={id}
					onChange={onChangeMode}
					value='ON'
				>
					{__('on')}
				</Radio>
			)}

			<Select
				id={`${id}-month`}
				name={`${id}-month`}
				aria-label={__('Repeat yearly on month')}
				className='rrule-generator__select rrule-generator__month'
				value={on.month}
				isDisabled={!isActive}
				onBlur={onChangeMonth}
				onChange={onChangeMonth}
				width='auto'
			>
				{Object.entries(MONTHS).map(([key, month]) => (
					<option key={key} value={key}>
						{month}
					</option>
				))}
			</Select>

			<Divider orientation='vertical' size='tiny' />

			<Select
				id={`${id}-day`}
				name={`${id}-day`}
				aria-label={__('Repeat yearly on a day')}
				className='rrule-generator__select rrule-generator__day'
				value={on.day}
				isDisabled={!isActive}
				onBlur={onChangeDay}
				onChange={onChangeDay}
				width='auto'
			>
				{range(1, daysInMonth + 1).map((day) => (
					<option key={day} value={day}>
						{day}
					</option>
				))}
			</Select>
		</Stack>
	);
};

export default On;
