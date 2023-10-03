import classNames from 'classnames';

import type { Size } from '../types';

interface FilterBarFilterProps extends Size {
	className?: string;
}

const FilterBarFilter: React.FC<FilterBarFilterProps> = ({ children, className, size }) => {
	const filterClasses = classNames('ee-filter-bar__filter', size && `ee-filter-bar__filter--${size}`, className);
	return <div className={filterClasses}>{children}</div>;
};

export default FilterBarFilter;
