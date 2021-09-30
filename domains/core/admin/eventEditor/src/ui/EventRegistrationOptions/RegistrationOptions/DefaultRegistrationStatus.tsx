import { __ } from '@eventespresso/i18n';
import classNames from 'classnames';
import { SelectWithLabel } from '@eventespresso/ui-components';
import { regStatusOptions } from '@eventespresso/predicates';
import type { EventRegistrationOptionsProps } from '../types';

interface Props extends Pick<EventRegistrationOptionsProps, 'defaultRegStatus' | 'onDefaultRegStatusChange'> {}

const DefaultRegistrationStatus: React.FC<Props> = ({ defaultRegStatus, onDefaultRegStatusChange }) => {
	const id = 'ee-event-registration-default-status';
	const regStatusCode = regStatusOptions.filter((option) => option.value === defaultRegStatus);
	const className = classNames(
		'ee-reg-option__default-status',
		'ee-reg-options__value',
		'ee-status-background',
		`ee-status-background-color-${regStatusCode[0].code}`
	);

	return (
		<SelectWithLabel
			className={className}
			fitContainer
			flow='inline'
			label={__('Default Registration Status')}
			id={`${id}-select`}
			noBorderColor
			onChangeValue={onDefaultRegStatusChange}
			options={regStatusOptions}
			value={defaultRegStatus}
			labelClassName='ee-grid__item-label'
			labelPosition='left-middle'
		/>
	);
};

export default DefaultRegistrationStatus;
