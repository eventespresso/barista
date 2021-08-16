import { getHooks } from '@eventespresso/ioc';
import type { MutationType, ApolloCache, Entity } from '@eventespresso/data';
import type { OptionsType } from '@eventespresso/adapters';
import type { BulkEdit } from '@eventespresso/services';
import type { ButtonProps } from '@eventespresso/ui-components';
import type { SimpleTextEditorModalProps } from '@eventespresso/ee-components';

import { Datetime, Ticket } from '../apollo';
import { DateFormShape, DateFormConfig, TicketFormShape, TicketFormConfig } from '../forms';

type MutationActionArgs<E extends Entity> = [
	mutationType: MutationType,
	input: Record<string, any>,
	entity: E,
	cache?: ApolloCache<any>
];

export type Actions = {
	'eventEditor.ticket.mutation': MutationActionArgs<Ticket>;
	'eventEditor.datetimes.bulkEdit.apply': [action: string, bulkEdit: BulkEdit];
};
export type Filters = {
	'eventEditor.ticketForm.initalValues': [initialValues: TicketFormShape, ticket: Ticket];
	'eventEditor.ticketForm.sections': [sections: TicketFormConfig['sections'], ticket: Ticket];
	'eventEditor.dateForm.initalValues': [initialValues: DateFormShape, datetime: Datetime];
	'eventEditor.dateForm.sections': [sections: DateFormConfig['sections'], datetime: Datetime];
	'eventEditor.ticket.mutationInput': [input: Record<string, any>, rawInput?: Record<string, any>];
	'eventEditor.datetimes.bulkEdit.actions': [actions: OptionsType];
	'eventEditor.addSingleDate.button': [button: JSX.Element, isOnlyButton: boolean];
	'eventEditor.addSingleDate.buttonProps': [props: Partial<ButtonProps>, isOnlyButton: boolean];
	'eventEditor.datetimes.inlineDescriptionProps': [props: Partial<SimpleTextEditorModalProps>, entity: Datetime];
	'eventEditor.tickets.inlineDescriptionProps': [props: Partial<SimpleTextEditorModalProps>, entity: Ticket];
};

export const hooks = getHooks<Actions, Filters>();
