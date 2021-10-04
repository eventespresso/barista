import { useCallback } from 'react';
import { __ } from '@eventespresso/i18n';

import { Divider, NumberInput, Stack, Label } from '@eventespresso/ui-components';

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
		<Stack className='rrule-generator__form-group-row rrule-generator__form-group-row--align-items-start rrule-generator__form-group-row--no-label rrule-generator__repeat-weekly'>
			{/* <label className='rrule-generator__labelled-input'>
				<span>{__('every')}</span> */}
			<Label label={__('every')} />
			{/* <Divider orientation='vertical' size='tiny' /> */}
			<NumberInput
				aria-label={__('Repeat weekly interval')}
				id={`${id}-interval`}
				name={`${id}-interval`}
				onChange={onChangeInterval}
				showStepper={false}
				value={weekly?.interval}
				visibleDigits={3}
			/>
			{/* <span>{__('week(s)')}</span>
			</label> */}
			<Label label={__('week(s)')} />

			{/* TODO arrange days according to week start day */}
			<div className='rrule-generator__week-day-checkbox-group'>
				{Object.entries(weekly?.days).map(([dayName, isDayActive]) => {
					const dayId = `${id}-${dayName}`;

					return (
						<label htmlFor={dayId} key={dayName} className={isDayActive ? 'active' : ''}>
							<input
								checked={isDayActive}
								className='rrule-generator__form-control rrule-generator__input'
								id={dayId}
								name={dayId}
								onChange={onChangeDays}
								type='checkbox'
							/>
							<span>{SHORT_DAYS?.[dayName]}</span>
						</label>
					);
				})}
			</div>
		</Stack>
	);
};

export default Weekly;
