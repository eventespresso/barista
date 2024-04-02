import type { Datetime } from '@eventespresso/constants';
import filter from './filter';

type BelowCapacityProps = {
	capacity: number;
	dates: Datetime[];
};

const belowCapacity = ({ capacity, dates }: BelowCapacityProps): Datetime[] => {
	return dates.filter((date) => filter({ capacity, date }));
};

export default belowCapacity;
