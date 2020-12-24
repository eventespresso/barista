import React from 'react';
import { __ } from '@eventespresso/i18n';

import useGetBodyRows from './useGetBodyRows';
import useGetHeaderRows from './useGetHeaderRows';
import { DatesAndTickets } from '../../types';
import { ResponsiveTable } from '@eventespresso/components';

import './styles.scss';

const metaData = {
	isScrollable: true,
	tableId: 'ee-ticket-assignments-manager-table',
	tableCaption: __('Ticket Assignment Manager'),
};
const className = { tableClassName: 'ee-ticket-assignments-manager' };

const Table: React.FC<DatesAndTickets> = ({ datetimes, tickets }) => {
	const bodyRows = useGetBodyRows({ datetimes, tickets });
	const headerRows = useGetHeaderRows(tickets);

	return <ResponsiveTable bodyRows={bodyRows} headerRows={headerRows} metaData={metaData} className={className} />;
};

export default Table;
