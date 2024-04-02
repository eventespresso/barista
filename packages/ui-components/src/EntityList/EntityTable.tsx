import classNames from 'classnames';

import { useMemoStringify } from '@eventespresso/utils';

import { ResponsiveTable } from '../EspressoTable';
import type { EntityTableProps } from './types';

export const EntityTable: React.FC<EntityTableProps> = ({ bodyRows, headerRows, metaData, ...props }) => {
	const className = useMemoStringify({ tableClassName: classNames('ee-entity-table', props.className) }, [
		props.className,
	]);

	return (
		<ResponsiveTable
			{...props}
			bodyRows={bodyRows}
			className={className}
			headerRows={headerRows}
			metaData={metaData}
		/>
	);
};
