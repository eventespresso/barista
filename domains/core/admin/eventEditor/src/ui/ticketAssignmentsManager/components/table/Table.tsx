import { __ } from '@eventespresso/i18n';

import useGetBodyRows from './useGetBodyRows';
import useGetHeaderRows from './useGetHeaderRows';
import { DatesAndTickets } from '../../types';
import { ResponsiveTable } from '@eventespresso/ui-components';

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

	return <ResponsiveTable bodyRows={bodyRows} className={className} headerRows={headerRows} metaData={metaData} />;
};

export default Table;
