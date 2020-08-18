import React from 'react';

import { getPropsAreEqual } from '@eventespresso/services';
import { useTicketMutator } from '@eventespresso/edtr-services';
import { EditableName, EditablePrice } from '../editable';
import { EditableDesc } from '../../../shared/editable';
import TicketDetailsPanel from './TicketDetailsPanel';
import type { TicketItemProps } from '../types';

const Details: React.FC<TicketItemProps> = ({ entity: ticket }) => {
	const { updateEntity } = useTicketMutator(ticket.id);

	return (
		<>
			<EditableName className={'entity-card-details__name'} entity={ticket} />

			<EditableDesc description={ticket.description} updateEntity={updateEntity} />

			<EditablePrice className='entity-card-details__price' entity={ticket} />

			<TicketDetailsPanel entity={ticket} />
		</>
	);
};

export default React.memo(Details, getPropsAreEqual(['entity', 'cacheId']));
