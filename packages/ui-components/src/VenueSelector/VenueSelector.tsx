import { useCallback, useRef, useState } from 'react';
import { useOutsideClick } from '@chakra-ui/react';
import classNames from 'classnames';

import { __ } from '@eventespresso/i18n';
import { Building } from '@eventespresso/icons';
import { usePrevious } from '@eventespresso/hooks';

import { Link } from '../Button';
import { Heading } from '../Heading';
import { SelectWithLabel } from '../Select';

import './styles.scss';

interface VenueSelectorProps extends React.ComponentProps<typeof SelectWithLabel> {
	align?: 'center';
	createVenueLink?: string;
	inline?: boolean;
	venueName?: string;
}

export const VenueSelector: React.FC<VenueSelectorProps> = ({
	align,
	createVenueLink,
	inline,
	value,
	venueName,
	...props
}) => {
	const ref = useRef();
	const previousValue = usePrevious(value);
	// tracking selected venue ID internally so that things like keyboard selection don't trigger updates immediately
	const [selectedVenueId, setSelectedVenueId] = useState(value as React.ReactText);

	const [isEditing, setIsEditing] = useState(false);
	useOutsideClick({
		ref: ref,
		handler: () => {
			if (previousValue !== selectedVenueId) {
				props.onChangeValue?.(selectedVenueId);
			}
			setIsEditing(false);
		},
	});

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
				setIsEditing(false);
			}
		},
		[previousValue, props]
	);

	const onClick = useCallback(() => setIsEditing(true), [setIsEditing]);

	const className = classNames(props.className, 'ee-venue-selector__input');
	const wrapperClass = classNames('ee-venue-selector', inline && 'ee-venue-selector--inline');
	const previewClass = classNames(
		'ee-venue-selector__preview',
		align && `ee-venue-selector__preview--align-${align}`
	);

	if (inline && !isEditing) {
		return (
			<div className={previewClass}>
				<Heading as='h6' onClick={onClick}>
					<Building />
					<span>{venueName}</span>
				</Heading>
			</div>
		);
	}
	const addNewVenue = createVenueLink && (
		<div className='ee-venue-selector__add-new'>
			<Link className='ee-venue-selector__add-new-link' href={createVenueLink}>
				{__('Add New Venue')}
			</Link>
		</div>
	);

	return (
		<div className={wrapperClass}>
			<SelectWithLabel
				flow={inline ? 'inline' : null}
				size='small'
				{...props}
				className={className}
				onChangeValue={onChangeValue}
				onChangeInstantValue={onChangeInstantValue}
				ref={ref}
				value={selectedVenueId}
			/>
			{addNewVenue}
		</div>
	);
};
