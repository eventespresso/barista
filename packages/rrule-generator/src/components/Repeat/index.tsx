import { __ } from '@eventespresso/i18n';

import { Row, Label } from '@eventespresso/ui-components';
import Frequency from './Frequency';
import { useRRuleState } from '../../hooks';
import type { BaseProps } from '../types';

const Repeat: React.FC<BaseProps> = ({ id }) => {
	const {
		repeat: { frequency },
		setRepeatFrequency,
	} = useRRuleState();

	const frequencyId = `${id}-frequency`;

	return (
		<Row className='rrule-generator__form-group-row'>
			<Label id={frequencyId} className='col-form-label' label={__('Repeat')} />
			<Frequency frequency={frequency} id={frequencyId} onChange={setRepeatFrequency} />
		</Row>
	);
};
export default Repeat;
