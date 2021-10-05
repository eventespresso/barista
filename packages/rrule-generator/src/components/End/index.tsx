import { __ } from '@eventespresso/i18n';
import { Row, Label } from '@eventespresso/ui-components';

import EndAfter from './After';
import OnDate from './OnDate';

import Mode from './Mode';
import { useRRuleState } from '../../hooks';
import { BaseProps } from '../types';

const End: React.FC<BaseProps> = ({ id }) => {
	const { end, setEndMode, setEndAfter, setEndDate } = useRRuleState();
	const endModeId = `${id}-mode`;

	return (
		<Row className='rrule-generator__form-group-row'>
			<Label id={endModeId} label={__('End')} className='col-form-label' />
			{/* <label htmlFor={endModeId} className='col-form-label'>
				<strong>{__('End')}</strong>
			</label> */}

			<Mode id={endModeId} mode={end.mode} onChange={setEndMode} />

			{end.mode === 'AFTER' && (
				<EndAfter
					after={end.after}
					fontWeightNormal
					id={`${id}-after`}
					label={__('occurrences')}
					labelPosition='right-middle'
					noPadding
					onChange={setEndAfter}
				/>
			)}

			{end.mode === 'ON_DATE' && <OnDate id={`${id}-date`} date={end.date} onChange={setEndDate} />}
		</Row>
	);
};

export default End;
