import { useCallback, useState } from 'react';
import classNames from 'classnames';

import { __ } from '@eventespresso/i18n';
import { Building } from '@eventespresso/icons';
import { usePrevious } from '@eventespresso/hooks';

import { Link } from '../Button';
import { SelectWithLabel } from '../Select';

import './styles.scss';

interface VenueSelectorProps extends React.ComponentProps<typeof SelectWithLabel> {
	createVenueLink?: string;
	inline?: boolean;
	showIcon?: boolean;
}

export const VenueSelector: React.FC<VenueSelectorProps> = ({
	createVenueLink,
	inline = true,
	showIcon,
	value,
	...props
}) => {
	// tracking selected venue ID internally so that things like keyboard selection don't trigger updates immediately
	const [selectedVenueId, setSelectedVenueId] = useState(value || '');

	const previousValue = usePrevious(value);

	const onChangeInstantValue = useCallback(
		(newValue: string) => {
			setSelectedVenueId(newValue);
			props.onChangeInstantValue?.(newValue);
		},
		[props]
	);

	const onChangeValue = useCallback(
		(newValue: string) => {
			// lets avoid unnecessary mutation
			if (previousValue !== newValue) {
				props.onChangeValue?.(newValue);
			}
		},
		[previousValue, props]
	);

	const className = classNames('ee-venue-selector__input', props.className);
	const wrapperClass = classNames('ee-venue-selector', inline && 'ee-venue-selector--inline');

	const addNewVenue = createVenueLink && (
		<div className='ee-venue-selector__add-new'>
			<Link className='ee-venue-selector__add-new-link' href={createVenueLink}>
				{__('Add New Venue')}
			</Link>
		</div>
	);

	return (
		<div className={wrapperClass}>
			{showIcon && <Building />}
			<SelectWithLabel
				flow={inline ? 'inline' : null}
				size='small'
				{...props}
				className={className}
				onChangeValue={onChangeValue}
				onChangeInstantValue={onChangeInstantValue}
				value={selectedVenueId}
			/>
			{addNewVenue}
		</div>
	);
};
