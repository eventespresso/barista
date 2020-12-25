import { useCallback } from 'react';

import { __ } from '@eventespresso/i18n';

import OnDate from '../OnDate';
import { useRRuleState } from '../../hooks';
import { BaseProps } from '../types';

import '../styles.scss';

const Start: React.FC<BaseProps> = ({ id }) => {
	const { start, setStartDate } = useRRuleState();
	const onChangeStart = useCallback(
		(date) => {
			setStartDate(date);
		},
		[setStartDate]
	);

	return (
		<div className='rrule-generator__form-group-row'>
			<label htmlFor={id}>
				<strong>{__('Start')}</strong>
			</label>
			<OnDate date={start.date} id={id} label={__('Start')} onChange={onChangeStart} />
		</div>
	);
};

export default Start;
