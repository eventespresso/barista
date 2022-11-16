import { __ } from '@eventespresso/i18n';
import { useGlobalModal } from '@eventespresso/registry';
import { DropdownMenu, DropdownMenuItem, DropdownMenuProps } from '@eventespresso/ui-components';
import { EdtrGlobalModals } from '@eventespresso/edtr-services';
import { withFeature, useCurrentUserCan } from '@eventespresso/services';

const toggleProps: DropdownMenuProps['toggleProps'] = {
	noPadding: true,
	size: 'big',
};

export const Actions = () => {
	const { open } = useGlobalModal(EdtrGlobalModals.DEFAULT_TICKETS);

	const currentUserCan = useCurrentUserCan();

	const canReadDefaultTickets = currentUserCan('read', 'default_tickets');

	return (
		<DropdownMenu noZindex toggleProps={toggleProps} wrapperClassName='default_tickets'>
			<DropdownMenuItem
				className='default_tickets'
				isDisabled={!canReadDefaultTickets}
				onClick={open}
				title={__('Default tickets')}
			/>
			{/* King's throne for other future items */}
		</DropdownMenu>
	);
};

// Since we only have default tickets in that dropdown for now, lets hide it completely
export default withFeature('use_default_ticket_manager')(Actions);
