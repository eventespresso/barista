import { useMemo } from 'react';

import { __ } from '@eventespresso/i18n';
import { ResponsiveTable } from '@eventespresso/ui-components';
import { useConfig } from '@eventespresso/services';
import { useMemoStringify } from '@eventespresso/utils';

import useBodyRowGenerator from './useBodyRowGenerator';
import useFooterRowGenerator from './useFooterRowGenerator';
import useHeaderRowGenerator from './useHeaderRowGenerator';
import { useDataState } from '../../data';
import type { TableProps } from '../../data/types';

import './styles.scss';

const Table: React.FC<TableProps> = ({ prices }) => {
	const config = useConfig();
	const { isDisabled, reverseCalculate, toggleCalcDir } = useDataState();
	const signB4 = config?.currency?.signB4;

	const bodyRowGenerator = useBodyRowGenerator();
	const footerRowGenerator = useFooterRowGenerator();
	const headerRowGenerator = useHeaderRowGenerator();

	const bodyRows = useMemo(
		() => prices.map((price, index) => bodyRowGenerator({ index, isDisabled, price })),
		[bodyRowGenerator, isDisabled, prices]
	);

	const footerRows = useMemo(() => {
		const footerRow = footerRowGenerator({ isDisabled, reverseCalculate, toggleCalcDir });
		return [footerRow];
	}, [footerRowGenerator, isDisabled, reverseCalculate, toggleCalcDir]);

	const headerRows = useMemo(() => {
		const headerRow = headerRowGenerator({ signB4 });
		return [headerRow];
	}, [headerRowGenerator, signB4]);

	const className = useMemoStringify({ tableClassName: 'ee-ticket-price-calculator' });
	const metaData = useMemoStringify({
		tableId: 'ticket-price-calculator-table',
		tableCaption: __('Ticket Price Calculator'),
	});

	return (
		<ResponsiveTable
			bodyRows={bodyRows}
			className={className}
			footerRows={footerRows}
			headerRows={headerRows}
			metaData={metaData}
		/>
	);
};

export default Table;
