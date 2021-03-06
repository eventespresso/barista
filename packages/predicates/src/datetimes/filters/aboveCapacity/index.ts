import type { Datetime } from '@eventespresso/edtr-services';
import capacityAtOrAbove from '../../capacityAtOrAbove';

type AboveCapacityProps = {
	capacity: number;
	dates: Datetime[];
};

const aboveCapacity = ({ capacity, dates }: AboveCapacityProps): Datetime[] => {
	const filterFn = (date: Datetime): boolean => !date.isTrashed && capacityAtOrAbove(date, capacity);

	return dates.filter(filterFn);
};

export default aboveCapacity;
