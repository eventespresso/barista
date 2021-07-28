import { useCallback, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';

import { __ } from '@eventespresso/i18n';
import { Building, Edit } from '@eventespresso/icons';
import { useOnClickOutside, usePrevious } from '@eventespresso/hooks';
import { entityListToSelectOptions } from '@eventespresso/utils';

import { Link } from '../Button';
import { Heading } from '../Heading';
import { SelectWithLabel } from '../Select';
import { TabbableText } from '../TabbableText';

import './styles.scss';

interface Option {
	label: string;
	value: string;
}

interface VenueSelectorProps extends React.ComponentProps<typeof SelectWithLabel> {
	align?: 'center';
	createVenueLink?: string;
	emptyOption?: Option;
	inline?: boolean;
	noVenueMsg?: string;
	tooltip?: string;
	value?: string;
	venueName?: string;
	venues: Array<{
		id: string;
		name: string;
	}>;
}

const defaultEmptyOption = { label: __('~ no venue ~'), value: '0' };

export const VenueSelector: React.FC<VenueSelectorProps> = ({
	align,
	createVenueLink,
	emptyOption = defaultEmptyOption,
	inline,
	noVenueMsg = __('assign venue…'),
	tooltip = __('click to select a venue…'),
	value,
	venueName,
	venues,
	...props
}) => {
	const ref = useRef();
	const [isEditing, setIsEditing] = useState(false);
	const previousValue = usePrevious<string>(value, value);

	// tracking selected venue ID internally so that things like keyboard selection don't trigger updates immediately
	const [selectedVenueId, setSelectedVenueId] = useState<string>(value);
	const options = useMemo(() => entityListToSelectOptions(venues, emptyOption), [emptyOption, venues]);

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
				onChangeInstantValue(newValue);
				props.onChangeValue?.(newValue);
			}
			setIsEditing(false);
		},
		[onChangeInstantValue, previousValue, props]
	);

	useOnClickOutside({
		ref: ref,
		handler: () => {
			if (isEditing) {
				onChangeValue(selectedVenueId);
			}
		},
	});

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
				<TabbableText className='ee-inline-edit__preview' onClick={onClick} tooltip={tooltip}>
					{selectedVenueId && selectedVenueId !== '0' ? (
						<Heading as='h6'>
							<Building />
							&nbsp;&nbsp;
							<span>{venueName}</span>
						</Heading>
					) : (
						<span className='ee-venue-selector__preview--no-venue'>
							{noVenueMsg}
							&nbsp;
							<Edit />
						</span>
					)}
				</TabbableText>
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
				options={options}
				ref={ref}
				value={selectedVenueId ?? ''}
			/>
			{addNewVenue}
		</div>
	);
};
