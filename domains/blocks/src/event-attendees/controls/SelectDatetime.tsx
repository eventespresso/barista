import React from 'react';
import { SelectControl } from '@wordpress/components';
import { __ } from '@eventespresso/i18n';

import { AttendeesEditProps } from '../types';
import { useDatetimes } from '@blocksServices/apollo';
import { buildEntitySelectOptions } from '@blocksServices/utils';
import type { SelectControlProps } from '@blocksComponents/types';

const SelectDatetime: React.FC<AttendeesEditProps> = ({ attributes, setAttributes }) => {
	const { datetime, event } = attributes;

	const { data, loading, error } = useDatetimes(event);

	const list = data?.espressoDatetimes?.nodes || [];
	const options = buildEntitySelectOptions(list, loading, error);

	return (
		<SelectControl
			label={__('Select Datetime')}
			value={datetime}
			options={options as SelectControlProps['options']}
			onChange={(datetime): void => setAttributes({ datetime, ticket: '' })}
		/>
	);
};

export default SelectDatetime;
