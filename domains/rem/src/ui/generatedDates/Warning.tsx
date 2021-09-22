import classNames from 'classnames';

import { useFormState } from '../../data';

import { ErrorMessage } from '@eventespresso/ui-components';
import { getLimitsWarning, useIsCountCapped } from '../../utils';

const Warning: React.FC = () => {
	const wrapperClassName = classNames('rrule-generator-wrapper');
	const isCountCapped = useIsCountCapped();

	const { rRule } = useFormState();

	if (!isCountCapped) {
		return null;
	}
	const warning = getLimitsWarning(rRule);

	return (
		<div className={wrapperClassName}>
			<ErrorMessage message={warning} />
		</div>
	);
};

export default Warning;
