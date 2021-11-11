import type { Entity, EntityEdge, RecurrencesList as RecurrenceList } from '@eventespresso/data';

export interface Recurrence extends Entity {
	dateDuration: string;
	exDates: string;
	exRule: string;
	rDates: string;
	rRule: string;
	name: string;
}

export interface RecurrenceItem {
	espressoRecurrence: Recurrence;
}

export type RecurrenceEdge<Connection = 'EspressoRootQueryRecurrencesConnection'> = EntityEdge<Recurrence, Connection>;

export type RecurrencesList = RecurrenceList<RecurrenceEdge>;
