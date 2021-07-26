import { useCallback, useMemo } from 'react';

import { __ } from '@eventespresso/i18n';

import { useEvents } from '@blocksServices/apollo';
import { buildEntitySelectOptions } from '@blocksServices/utils';
import { Select as SelectControl } from '../../adapters';
import { EventFieldEditProps } from '../types';

export const SelectEvent: React.FC<EventFieldEditProps> = ({ attributes, setAttributes }) => {
	const { event } = attributes;

	const { data, loading, error } = useEvents();

	const list = useMemo(() => data?.espressoEvents?.nodes || [], [data?.espressoEvents?.nodes]);
	const options = useMemo(() => buildEntitySelectOptions(list, loading, error), [error, list, loading]);
	const onChange = useCallback((event): void => setAttributes({ event }), [setAttributes]);

	return (
		<SelectControl
			id='event-field-select-event'
			label={__('Select Event')}
			value={event}
			options={options}
			onChange={onChange}
		/>
	);
};
