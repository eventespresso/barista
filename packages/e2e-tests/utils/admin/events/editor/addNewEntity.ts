import { addNewDate, addNewTicket } from '..';
import { EntityType } from '../../../../types';

interface Props {
	entityType: EntityType;
	name: string;
}

export const addNewEntity = async ({ entityType, name }: Props) => {
	entityType === 'datetime' && (await addNewDate({ name }));
	entityType === 'ticket' && (await addNewTicket({ name }));
};
