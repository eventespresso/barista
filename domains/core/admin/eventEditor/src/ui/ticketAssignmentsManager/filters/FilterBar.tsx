import {
	DatesByMonthControl,
	ShowExpiredTicketsControl,
	ShowTrashedDatesControl,
	ShowTrashedTicketsControl,
} from './controls';
import { useTAMContext } from '../context';
import { useFilterState } from '../filters';

const FilterBar: React.FC = () => {
	const { assignmentType } = useTAMContext();
	const {
		datesByMonth,
		setDatesByMonth,
		setShowExpiredTickets,
		setShowTrashedDates,
		setShowTrashedTickets,
		showExpiredTickets,
		showTrashedDates,
		showTrashedTickets,
	} = useFilterState();

	return (
		<div className='ee-ticket-assignments-manager__filter-bar'>
			{assignmentType !== 'forDate' && (
				// useless when TAM is for single date
				<>
					<DatesByMonthControl datesByMonth={datesByMonth} setDatesByMonth={setDatesByMonth} />
					<ShowTrashedDatesControl
						showTrashedDates={showTrashedDates}
						setShowTrashedDates={setShowTrashedDates}
					/>
				</>
			)}

			{assignmentType !== 'forTicket' && (
				// useless when TAM is for single ticket
				<>
					<ShowExpiredTicketsControl
						showExpiredTickets={showExpiredTickets}
						setShowExpiredTickets={setShowExpiredTickets}
					/>
					<ShowTrashedTicketsControl
						showTrashedTickets={showTrashedTickets}
						setShowTrashedTickets={setShowTrashedTickets}
					/>
				</>
			)}
		</div>
	);
};

export default FilterBar;
