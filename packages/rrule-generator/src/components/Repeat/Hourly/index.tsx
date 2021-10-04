import { __ } from '@eventespresso/i18n';
import { NumberInput, Stack, Label } from '@eventespresso/ui-components';

import { useRRuleState } from '../../../hooks';
import { useIntervalUpdater } from '../../../utils';
import type { BaseProps } from '../../types';

const Hourly: React.FC<BaseProps> = ({ id }) => {
	const {
		repeat: { hourly },
		setRepeatInterval,
	} = useRRuleState();

	const onChangeInterval = useIntervalUpdater('hourly', setRepeatInterval);

	return (
		<Stack className='rrule-generator__form-group-row rrule-generator__form-group-row--align-items-start rrule-generator__form-group-row--no-label'>
			<Label label={__('every')} />
			{/* <label className='rrule-generator__labelled-input'>
				<span>{__('every')}</span>
				<Divider orientation='vertical' size='tiny' /> */}
			<NumberInput
				aria-label={__('Repeat hourly interval')}
				id={`${id}-interval`}
				name={`${id}-interval`}
				onChange={onChangeInterval}
				value={hourly?.interval}
			/>
			{/* <span>{__('hour(s)')}</span>
			</label> */}
			<Label label={__('hour(s)')} />
		</Stack>
	);
};

export default Hourly;
