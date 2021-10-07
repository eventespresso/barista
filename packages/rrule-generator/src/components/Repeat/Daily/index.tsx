import { __ } from '@eventespresso/i18n';
import { NumberInput, Stack, Label, Row } from '@eventespresso/ui-components';

import { useRRuleState } from '../../../hooks';
import { useIntervalUpdater } from '../../../utils';
import type { BaseProps } from '../../types';

const Daily: React.FC<BaseProps> = ({ id }) => {
	const {
		repeat: { daily },
		setRepeatInterval,
	} = useRRuleState();

	const onChangeInterval = useIntervalUpdater('daily', setRepeatInterval);

	return (
		<Stack>
			<Row className='rrule-generator__label-every'>
				<Label label={__('every')} />
				<NumberInput
					aria-label={__('Repeat daily interval')}
					id={`${id}-interval`}
					name={`${id}-interval`}
					onChange={onChangeInterval}
					showStepper={false}
					value={daily?.interval}
					visibleDigits={3}
				/>
				<Label label={__('day(s)')} />
			</Row>
		</Stack>
	);
};

export default Daily;
