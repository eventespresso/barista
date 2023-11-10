import classNames from 'classnames';

import type { Width } from '../types';

interface FilterBarFilterProps extends Width {
	className?: string;
}

const FilterBarFilter: React.FC<FilterBarFilterProps> = ({ children, className, width }) => {
	const filterClasses = classNames(
		'ee-filter-bar__filter',
		width && `ee-filter-bar__filter-width--${width}`,
		className
	);
	return <div className={filterClasses}>{children}</div>;
};

export default FilterBarFilter;
