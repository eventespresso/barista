import type { Ticket } from '@eventespresso/constants';

const isLocked = (ticket: Partial<Ticket>): boolean => ticket.registrationCount > 0;

export default isLocked;
