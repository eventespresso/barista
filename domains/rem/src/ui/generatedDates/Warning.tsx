import { useFormState } from '../../data';

import { ErrorMessage } from '@eventespresso/ui-components';
import { getLimitsWarning, useIsCountCapped } from '../../utils';

const Warning: React.FC = () => {
	const isCountCapped = useIsCountCapped();

	const { rRule } = useFormState();

	if (!isCountCapped) {
		return null;
	}
	const warning = getLimitsWarning(rRule);

	return (
		<div className='rrule-generator-wrapper'>
			<ErrorMessage message={warning} />
		</div>
	);
};

export default Warning;
