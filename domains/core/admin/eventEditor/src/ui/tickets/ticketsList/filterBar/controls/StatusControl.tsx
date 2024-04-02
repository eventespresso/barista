import { SelectWithLabel } from '@eventespresso/ui-components';
import { useTicketsListFilterState } from '@eventespresso/edtr-services';
import { objectToSelectOptions, useMemoStringify } from '@eventespresso/utils';

import { labels, statusOptions, statusIsChainedOptions } from './options';

const StatusControl: React.FC = () => {
	const { isChained, status, setStatus } = useTicketsListFilterState();
	const options = useMemoStringify(objectToSelectOptions(isChained ? statusIsChainedOptions : statusOptions), [
		isChained,
	]);

	return (
		<SelectWithLabel
			id='ee-tickets-list-status-control'
			label={labels.status}
			onChangeValue={setStatus}
			options={options}
			value={status}
		/>
	);
};

export default StatusControl;
