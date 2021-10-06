import { useCallback } from 'react';

import { __ } from '@eventespresso/i18n';
import { Divider, Radio, Select, Stack } from '@eventespresso/ui-components';

import { DAYS } from '../../../constants';
import PositionSelect from '../PositionSelect';
import { OnProps } from '../types';
import { useRRuleState } from '../../../hooks';
import { OnChangeSelect } from '../../types';
import { Which, Day } from '../../../types';

const OnThe: React.FC<OnProps> = ({ id, isTheOnlyMode, onChangeMode }) => {
	const {
		repeat: { monthly },
		setRepeatWhich,
		setRepeatDay,
	} = useRRuleState();

	const isActive = monthly?.mode === 'ON_THE';
	const onThe = monthly?.onThe;

	const onChangeWhich = useCallback<OnChangeSelect>(
		(event) => {
			const value = event.target.value as Which;
			setRepeatWhich('monthly', value);
		},
		[setRepeatWhich]
	);

	const onChangeDay = useCallback<OnChangeSelect>(
		(event) => {
			const value = event.target.value as Day;
			setRepeatDay('monthly', 'onThe', value);
		},
		[setRepeatDay]
	);

	return (
		<Stack className='rrule-generator__on-the'>
			{!isTheOnlyMode && (
				<Radio
					aria-label={__('Repeat monthly on the')}
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
				aria-label={__('Repeat monthly on the which')}
				id={id}
				isActive={isActive}
				onChangeWhich={onChangeWhich}
				value={onThe.which}
			/>

			<Divider orientation='vertical' size='tiny' />

			<Select
				id={`${id}-day`}
				name={`${id}-day`}
				aria-label={__('Repeat monthly on the day')}
				className='rrule-generator__select rrule-generator__month'
				value={onThe.day}
				isDisabled={!isActive}
				onBlur={onChangeDay}
				onChange={onChangeDay}
				width='auto'
			>
				{Object.entries(DAYS).map(([key, day]) => (
					<option key={key} value={key}>
						{day}
					</option>
				))}
			</Select>
		</Stack>
	);
};

export default OnThe;
