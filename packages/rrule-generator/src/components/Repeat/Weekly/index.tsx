import { useCallback } from 'react';
import { __ } from '@eventespresso/i18n';

import { Row, NumberInput, Stack, Label } from '@eventespresso/ui-components';

import { useRRuleState } from '../../../hooks';
import { SHORT_DAYS } from '../../../constants';
import { useIntervalUpdater } from '../../../utils';
import type { BaseProps, OnChangeInput } from '../../types';

import './styles.scss';

const Weekly: React.FC<BaseProps> = ({ id }) => {
	const {
		repeat: { weekly },
		setRepeatInterval,
		setRepeatWeeklyDays,
	} = useRRuleState();

	const onChangeInterval = useIntervalUpdater('weekly', setRepeatInterval);

	const onChangeDays = useCallback<OnChangeInput>(
		(event) => {
			// replace id to get the day name
			const name = event.target.name?.replace(`${id}-`, '');
			const value = event.target.checked;

			setRepeatWeeklyDays({ [name]: value });
		},
		[id, setRepeatWeeklyDays]
	);

	return (
		<Stack>
			<Row>
				<Label label={__('every')} />
				<NumberInput
					aria-label={__('Repeat weekly interval')}
					id={`${id}-interval`}
					name={`${id}-interval`}
					onChange={onChangeInterval}
					showStepper={false}
					value={weekly?.interval}
					visibleDigits={3}
				/>
				<Label label={__('week(s)')} />
			</Row>
			{/* TODO arrange days according to week start day */}
			<Row className='rrule-generator__week-day-checkbox-group'>
				{Object.entries(weekly?.days).map(([dayName, isDayActive]) => {
					const dayId = `${id}-${dayName}`;

					return (
						<label
							htmlFor={dayId}
							key={dayName}
							className={`ee-weekly-label ${isDayActive ? 'active' : ''}`}
						>
							<input
								className='ee-weekly-input'
								checked={isDayActive}
								id={dayId}
								name={dayId}
								onChange={onChangeDays}
								type='checkbox'
							/>
							<span className='ee-weekly-span'>{SHORT_DAYS?.[dayName]}</span>
						</label>
					);
				})}
			</Row>
		</Stack>
	);
};

export default Weekly;
