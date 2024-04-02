import { useCallback } from 'react';

import { __ } from '@eventespresso/i18n';
import { EdtrGlobalModals, useRelatedTickets } from '@eventespresso/edtr-services';
import { IconButton, ItemCount } from '@eventespresso/ui-components';
import { Ticket } from '@eventespresso/icons';
import { TypeName, withIsLoaded } from '@eventespresso/services';
import { useGlobalModal } from '@eventespresso/registry';
import type { BaseProps } from '@edtrUI/ticketAssignmentsManager';

import type { Datetime } from '@eventespresso/constants';
import type { EntityListItemProps } from '@eventespresso/ui-components';

const AssignTicketsButton: React.FC<EntityListItemProps<Datetime>> = ({ entity }) => {
	const { openWithData } = useGlobalModal<BaseProps>(EdtrGlobalModals.TAM);

	const getRelatedTickets = useRelatedTickets();

	const count = getRelatedTickets({
		entity: 'datetimes',
		entityId: entity.id,
	}).length;

	const title = count
		? __('Number of related tickets')
		: __('There are no tickets assigned to this datetime. Please click the ticket icon to update the assignments.');

	const onOpen = useCallback(() => {
		openWithData({ entity, assignmentType: 'forDate' });
	}, [entity, openWithData]);

	return (
		<ItemCount count={count} title={title} zeroCountChar='!'>
			<IconButton borderless icon={Ticket} onClick={onOpen} tooltip={__('assign tickets')} />
		</ItemCount>
	);
};

export default withIsLoaded<EntityListItemProps<Datetime>>(TypeName.tickets, ({ entity, loaded }) => {
	/* Hide TAM unless tickets are loaded */
	return loaded && <AssignTicketsButton entity={entity} />;
});
