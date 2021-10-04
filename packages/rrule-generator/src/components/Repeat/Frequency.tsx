import { useCallback } from 'react';

import { Select, Stack } from '@eventespresso/ui-components';

import Yearly from './Yearly';
import Monthly from './Monthly';
import Weekly from './Weekly';
import Daily from './Daily';
import Hourly from './Hourly';

import { Frequency as FrequencyType } from '../../types';
import { useRRuleConfig } from '../../hooks';
import { FrequencyProps } from './types';
import { FREQUENCY } from '../../constants';

import './styles.scss';

const Frequency: React.FC<FrequencyProps> = ({ id, frequency, onChange }) => {
	const { frequencies: frequencyTypes } = useRRuleConfig();

	const onChangeFrequency = useCallback(
		(event: React.ChangeEvent<HTMLSelectElement>) => {
			onChange(event.target.value as FrequencyType);
		},
		[onChange]
	);

	return (
		<Stack className='rrule-generator__frequency'>
			<Select
				className='rrule-generator__select'
				id={id}
				name={id}
				onBlur={onChangeFrequency}
				onChange={onChangeFrequency}
				value={frequency}
			>
				{frequencyTypes.map((frequencyType) => {
					return (
						<option key={frequencyType} value={frequencyType}>
							{FREQUENCY?.[frequencyType]}
						</option>
					);
				})}
			</Select>

			{frequency === 'YEARLY' && <Yearly id={`${id}-yearly`} />}
			{frequency === 'MONTHLY' && <Monthly id={`${id}-monthly`} />}
			{frequency === 'WEEKLY' && <Weekly id={`${id}-weekly`} />}
			{frequency === 'DAILY' && <Daily id={`${id}-daily`} />}
			{frequency === 'HOURLY' && <Hourly id={`${id}-hourly`} />}
		</Stack>
	);
};

export default Frequency;
