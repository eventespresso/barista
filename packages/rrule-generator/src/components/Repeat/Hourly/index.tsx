import { __ } from '@eventespresso/i18n';
import { NumberInput, Stack, Label, Row } from '@eventespresso/ui-components';

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
		<Stack>
			<Row className='rrule-generator__label-every'>
				<Label label={__('every')} />
				<NumberInput
					aria-label={__('Repeat hourly interval')}
					id={`${id}-interval`}
					name={`${id}-interval`}
					onChange={onChangeInterval}
					value={hourly?.interval}
				/>
				<Label label={__('hour(s)')} />
			</Row>
		</Stack>
	);
};

export default Hourly;
