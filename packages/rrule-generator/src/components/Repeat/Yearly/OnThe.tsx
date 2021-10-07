import { useCallback } from 'react';

import { __ } from '@eventespresso/i18n';
import { Divider, Radio, Select, Stack } from '@eventespresso/ui-components';

import PositionSelect from '../PositionSelect';
import { MONTHS, DAYS } from '../../../constants';
import { useRRuleState } from '../../../hooks';
import { OnChangeSelect } from '../../types';
import { Which, Month, Day } from '../../../types';
import { OnProps } from '../types';

const OnThe: React.FC<OnProps> = ({ id, isTheOnlyMode, onChangeMode }) => {
	const {
		repeat: { yearly },
		setRepeatMonth,
		setRepeatWhich,
		setRepeatDay,
	} = useRRuleState();

	const isActive = yearly?.mode === 'ON_THE';
	const onThe = yearly?.onThe;

	const onChangeWhich = useCallback<OnChangeSelect>(
		(event) => {
			const value = event.target.value as Which;
			setRepeatWhich('yearly', value);
		},
		[setRepeatWhich]
	);

	const onChangeDay = useCallback<OnChangeSelect>(
		(event) => {
			const value = event.target.value as Day;
			setRepeatDay('yearly', 'onThe', value);
		},
		[setRepeatDay]
	);

	const onChangeMonth = useCallback<OnChangeSelect>(
		(event) => {
			const value = event.target.value as Month;
			setRepeatMonth('onThe', value);
		},
		[setRepeatMonth]
	);

	return (
		<Stack className='rrule-generator__on-the'>
			{!isTheOnlyMode && (
				<Radio
					aria-label={__('Repeat yearly on the')}
					id={id}
					isChecked={isActive}
					name={id}
					onChange={onChangeMode}
					value='ON_THE'
				>
					{__('on the')}
				</Radio>
			)}

			<PositionSelect
				aria-label={__('Repeat yearly on the')}
				id={id}
				isActive={isActive}
				onChangeWhich={onChangeWhich}
				value={onThe.which}
			/>

			<Divider orientation='vertical' size='tiny' />

			<Select
				id={`${id}-day`}
				name={`${id}-day`}
				aria-label={__('Repeat yearly on the day')}
				value={onThe.day}
				isDisabled={!isActive}
				onBlur={onChangeDay}
				onChange={onChangeDay}
			>
				{Object.entries(DAYS).map(([key, day]) => (
					<option key={key} value={key}>
						{day}
					</option>
				))}
			</Select>

			<span>{__('of')}</span>

			<Select
				id={`${id}-month`}
				name={`${id}-month`}
				aria-label={__('Repeat yearly on the month')}
				value={onThe.month}
				isDisabled={!isActive}
				onBlur={onChangeMonth}
				onChange={onChangeMonth}
			>
				{Object.entries(MONTHS).map(([key, month]) => (
					<option key={key} value={key}>
						{month}
					</option>
				))}
			</Select>
		</Stack>
	);
};

export default OnThe;
