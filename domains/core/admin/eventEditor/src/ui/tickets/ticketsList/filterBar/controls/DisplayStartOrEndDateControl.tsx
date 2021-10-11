import { SelectWithLabel } from '@eventespresso/ui-components';
import { useTicketsListFilterState } from '@eventespresso/edtr-services';
import { objectToSelectOptions } from '@eventespresso/utils';

import { labels, displayStartOrEndDateOptions } from './options';

const options = objectToSelectOptions(displayStartOrEndDateOptions);

/**
 * filter for controlling which dates display in a list of Event Dates
 */
const DisplayStartOrEndDateControl: React.FC = () => {
	const { displayStartOrEndDate, setDisplayStartOrEndDate } = useTicketsListFilterState();

	return (
		<SelectWithLabel
			id='ee-tickets-list-display-control'
			label={labels.displayStartOrEndDate}
			onChangeValue={setDisplayStartOrEndDate}
			options={options}
			value={displayStartOrEndDate}
		/>
	);
};

export default DisplayStartOrEndDateControl;
