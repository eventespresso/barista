import * as R from 'ramda';
import { renderHook, act } from '@testing-library/react-hooks';

import { relationalData } from '@eventespresso/edtr-services/src/context/test';
import useAssignmentManager from '../useAssignmentManager';

const initArgs = { data: relationalData, assignmentType: 'forAll' as const };

describe('useAssignmentManager', () => {
	it('throws an error when initialized with null or undefined', () => {
		const { result } = renderHook(() => useAssignmentManager());

		[null, undefined].forEach((data) => {
			act(() => {
				expect(() => result.current.initialize({ ...initArgs, data })).toThrow();
			});
		});
	});

	it('initializes with an empty object', () => {
		const { result } = renderHook(() => useAssignmentManager());

		act(() => {
			result.current.initialize({ ...initArgs, data: {} });
		});

		expect(result.current.isInitialized()).toBe(true);
	});

	it('initializes with a proper relational object', () => {
		const { result } = renderHook(() => useAssignmentManager());

		act(() => {
			result.current.initialize(initArgs);
		});

		// only dates and tickets related data should be there.
		expect(typeof result.current.getData()).toBe('object');
		expect(result.current.getData()).toHaveProperty('datetimes');
		expect(result.current.getData()).toHaveProperty('tickets');
		expect(result.current.getData()).not.toHaveProperty('prices');
		expect(R.head(Object.values(result.current.getData().tickets))).toHaveProperty('datetimes');
		expect(R.head(Object.values(result.current.getData().tickets))).not.toHaveProperty('prices');
	});

	it('returns assigned tickets to a given datetimeId', () => {
		const { result } = renderHook(() => useAssignmentManager());

		act(() => {
			result.current.initialize(initArgs);
		});

		// edge cases
		[null, undefined, 'fake-id'].forEach((datetimeId) => {
			expect(result.current.getAssignedTickets({ datetimeId })).toEqual([]);
		});

		const datetimeId = R.head(Object.keys(initArgs.data.datetimes));
		const assignedTickets = initArgs.data.datetimes[datetimeId].tickets;
		const ticketId = R.head(assignedTickets);

		// sane value for datetimeId
		expect(result.current.getAssignedTickets({ datetimeId })).toEqual(assignedTickets);
		expect(result.current.getAssignedTickets({ datetimeId })).toContain(ticketId);

		// lets toggle the assignment
		act(() => {
			result.current.toggleAssignment({ datetimeId, ticketId });
		});
		// now the ticket should no more be there
		expect(result.current.getAssignedTickets({ datetimeId })).not.toEqual(assignedTickets);
		expect(result.current.getAssignedTickets({ datetimeId })).not.toContain(ticketId);
	});

	it('returns assigned datetimes to a given ticketId', () => {
		const { result } = renderHook(() => useAssignmentManager());

		act(() => {
			result.current.initialize(initArgs);
		});

		// edge cases
		[null, undefined, 'fake-id'].forEach((ticketId) => {
			expect(result.current.getAssignedDates({ ticketId })).toEqual([]);
		});

		const ticketId = R.head(Object.keys(initArgs.data.tickets));
		const assignedDatetimes = initArgs.data.tickets[ticketId].datetimes;
		const datetimeId = R.head(assignedDatetimes);

		// sane value for ticketId
		expect(result.current.getAssignedDates({ ticketId })).toEqual(assignedDatetimes);
		expect(result.current.getAssignedDates({ ticketId })).toContain(datetimeId);

		// lets toggle the assignment
		act(() => {
			result.current.toggleAssignment({ ticketId, datetimeId });
		});
		// now the datetime should no more be there
		expect(result.current.getAssignedDates({ ticketId })).not.toEqual(assignedDatetimes);
		expect(result.current.getAssignedDates({ ticketId })).not.toContain(datetimeId);
	});

	it('adds assignment between a datetimeId and a ticketId', () => {
		const { result } = renderHook(() => useAssignmentManager());

		act(() => {
			result.current.initialize({ ...initArgs, data: {} });
		});

		const ticketId = 'test-ticket-id';
		const datetimeId = 'test-date-id';

		// initially they are empty
		expect(result.current.getAssignedDates({ ticketId })).toEqual([]);
		expect(result.current.getAssignedTickets({ datetimeId })).toEqual([]);

		// lets add assignment
		act(() => {
			result.current.addAssignment({ ticketId, datetimeId });
		});

		// they should be married by now
		expect(result.current.getAssignedDates({ ticketId })).toContain(datetimeId);
		expect(result.current.getAssignedTickets({ datetimeId })).toContain(ticketId);
	});

	it('removes assignment between a datetimeId and a ticketId', () => {
		const { result } = renderHook(() => useAssignmentManager());

		act(() => {
			result.current.initialize(initArgs);
		});

		const ticketId = R.head(Object.keys(initArgs.data.tickets));
		const assignedDatetimes = initArgs.data.tickets[ticketId].datetimes;
		const datetimeId = R.head(assignedDatetimes);

		// they are married for now
		expect(result.current.getAssignedDates({ ticketId })).toEqual(assignedDatetimes);
		expect(result.current.getAssignedDates({ ticketId })).toContain(datetimeId);

		// Divorce
		act(() => {
			result.current.removeAssignment({ ticketId, datetimeId });
		});
		// they should be separated by now
		expect(result.current.getAssignedDates({ ticketId })).not.toContain(datetimeId);
		expect(result.current.getAssignedTickets({ datetimeId })).not.toContain(ticketId);
	});

	it('toggles assignment between a datetimeId and a ticketId', () => {
		const { result } = renderHook(() => useAssignmentManager());

		act(() => {
			result.current.initialize(initArgs);
		});

		const ticketId = R.head(Object.keys(initArgs.data.tickets));
		const assignedDatetimes = initArgs.data.tickets[ticketId].datetimes;
		const datetimeId = R.head(assignedDatetimes);

		// they are married for now
		expect(result.current.getAssignedDates({ ticketId })).toEqual(assignedDatetimes);
		expect(result.current.getAssignedDates({ ticketId })).toContain(datetimeId);

		// Divorce
		act(() => {
			result.current.toggleAssignment({ ticketId, datetimeId });
		});
		// they should be separated by now
		expect(result.current.getAssignedDates({ ticketId })).not.toContain(datetimeId);
		expect(result.current.getAssignedTickets({ datetimeId })).not.toContain(ticketId);

		// lets patch them up
		act(() => {
			result.current.toggleAssignment({ ticketId, datetimeId });
		});

		// happy ending
		expect(result.current.getAssignedDates({ ticketId })).toEqual(assignedDatetimes);
		expect(result.current.getAssignedDates({ ticketId })).toContain(datetimeId);
	});
});
