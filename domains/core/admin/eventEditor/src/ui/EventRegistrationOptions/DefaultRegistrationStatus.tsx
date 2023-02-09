import { useMemo } from 'react';
import { __ } from '@eventespresso/i18n';
import classNames from 'classnames';
import { SelectWithLabel } from '@eventespresso/ui-components';
import { regStatusOptions } from '@eventespresso/predicates';
import type { EventRegistrationOptionsProps } from './types';

interface Props extends Pick<EventRegistrationOptionsProps, 'defaultRegStatus' | 'onDefaultRegStatusChange'> {}

const DefaultRegistrationStatus: React.FC<Props> = ({ defaultRegStatus, onDefaultRegStatusChange }) => {
	const regStatusCode = useMemo(
		() => regStatusOptions.filter((option) => option.value === defaultRegStatus),
		[defaultRegStatus]
	);
	const className = classNames(
		'ee-edtr-option ee-edtr-option__default-reg-status',
		'ee-status-background',
		`ee-status-background-color--${regStatusCode[0]?.code}`
	);

	return (
		<SelectWithLabel
			className={className}
			fitContainer
			flow='inline'
			label={__('Default Registration Status')}
			id='ee-event-registration-default-status-select'
			noBorderColor
			onChangeValue={onDefaultRegStatusChange}
			options={regStatusOptions}
			value={defaultRegStatus}
			labelClassName='ee-grid__item-label'
			labelPosition='left-middle'
			wrapperClassName='ee-edtr-option__wrapper ee-edtr-option__default-reg-status-wrapper'
		/>
	);
};

export default DefaultRegistrationStatus;
