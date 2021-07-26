import { useCallback } from 'react';

import { __ } from '@eventespresso/i18n';

import { Select as SelectControl } from '../../adapters';
import { EventFieldEditProps } from '../types';

const options = [
	{
		label: __('Select…'),
		value: '',
	},
	{
		value: 'name',
		label: __('Name'),
	},
	{
		value: 'description',
		label: __('Description'),
	},
	{
		value: 'shortDescription',
		label: __('Short description'),
	},
];

export const SelectField: React.FC<EventFieldEditProps> = ({ attributes, setAttributes }) => {
	const { field } = attributes;

	const onChange = useCallback((field): void => setAttributes({ field }), [setAttributes]);

	return (
		<SelectControl
			id='event-field-select-field'
			label={__('Select Field')}
			value={field}
			options={options}
			onChange={onChange}
		/>
	);
};
