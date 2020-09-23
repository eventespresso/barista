import React, { useCallback, useMemo } from 'react';
import { SelectControl } from '@wordpress/components';
import { __ } from '@eventespresso/i18n';

import { AttendeesEditProps } from '../types';
import { useDatetimes } from '@blocksServices/apollo';
import { buildEntitySelectOptions } from '@blocksServices/utils';
import type { SelectControlProps } from '@blocksComponents/types';

const SelectDatetime: React.FC<AttendeesEditProps> = ({ attributes, setAttributes }) => {
	const { datetime, event } = attributes;

	const { data, loading, error } = useDatetimes(event);

	const list = useMemo(() => data?.espressoDatetimes?.nodes || [], [data?.espressoDatetimes?.nodes]);
	const options = useMemo(() => buildEntitySelectOptions(list, loading, error), [error, list, loading]);
	const onChange = useCallback((datetime): void => setAttributes({ datetime, ticket: '' }), [setAttributes]);

	return (
		<SelectControl
			label={__('Select Datetime')}
			value={datetime}
			options={options as SelectControlProps['options']}
			onChange={onChange}
		/>
	);
};

export default SelectDatetime;
