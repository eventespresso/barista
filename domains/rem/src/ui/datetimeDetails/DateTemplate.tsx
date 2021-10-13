import { useState, useCallback, useMemo } from 'react';

import { __ } from '@eventespresso/i18n';

import { Button, Select } from '@eventespresso/ui-components';
import { entityListToSelectOptions, AnyObject } from '@eventespresso/utils';
import { useDatetimes, useDatetimeItem } from '@eventespresso/edtr-services';

import { EntityOptionsRow } from '../EntityOptionsRow';

interface DateTemplateProps {
	setTemplate: (date: AnyObject) => void;
}

const DateTemplate: React.FC<DateTemplateProps> = ({ setTemplate }) => {
	const [selectedDateId, setSelectedDateId] = useState('');
	const onChangeValue = useCallback((value) => setSelectedDateId(value), []);

	const allDates = useDatetimes();
	const datetime = useDatetimeItem({ id: selectedDateId });
	const options = useMemo(() => entityListToSelectOptions(allDates), [allDates]);

	const onSelectTemplate = useCallback(() => setTemplate(datetime), [datetime, setTemplate]);
	const onAddNew = useCallback(() => setTemplate({}), [setTemplate]);

	const selectExistingID = 'existing-datetime';
	const selectExisting = (
		<>
			<Select id={selectExistingID} options={options} onChangeValue={onChangeValue} />
			<Button buttonText={__('Select')} onClick={onSelectTemplate} isDisabled={!selectedDateId} />
		</>
	);

	return (
		<EntityOptionsRow
			hideAddNew={true}
			onAddNew={onAddNew}
			selectExisting={selectExisting}
			selectExistingID={selectExistingID}
			type='datetime'
		/>
	);
};

export default DateTemplate;
