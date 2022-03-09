import { useState, useCallback, useMemo } from 'react';

import { __ } from '@eventespresso/i18n';
import { BulkActions } from '@eventespresso/ee-components';
import { Collapsible, ErrorMessage } from '@eventespresso/ui-components';
import { useDisclosure, useMemoStringify } from '@eventespresso/hooks';
import { useTickets, useTicketsListFilterState } from '@eventespresso/edtr-services';
import { SOLD_TICKET_ERROR_MESSAGE } from '@eventespresso/tpc';
import { entitiesWithGuIdInArray, TicketsStatus } from '@eventespresso/predicates';
import { withPermission, useBulkEdit } from '@eventespresso/services';
import type { BulkActionsProps } from '@eventespresso/ui-components';

import Checkbox from '../../tableView/Checkbox';
import { EditDetails } from '../details';
import { Delete } from '../delete';
import { EditPrices } from '../prices';

type Action = 'edit-details' | 'delete' | 'edit-prices' | '';

const Actions: React.FC = () => {
	const [action, setAction] = useState<Action>('');

	const { isOpen, onOpen, onClose } = useDisclosure();
	const { status, showBulkActions } = useTicketsListFilterState();
	const { getSelected } = useBulkEdit();
	const allTickets = useTickets();

	const isEditPricesDisabled = useMemo(() => {
		const selectedTickets = entitiesWithGuIdInArray(allTickets, getSelected());
		const isSoldTicketSelected = selectedTickets.some((ticket) => Boolean(ticket.sold));
		return isSoldTicketSelected;
	}, [allTickets, getSelected]);

	const areTrashedTickets = status === TicketsStatus.trashedOnly;

	const options = useMemoStringify([
		{
			value: '',
			label: __('bulk actions'),
		},
		{
			value: 'edit-details',
			label: __('edit ticket details'),
		},
		{
			value: 'delete',
			label: areTrashedTickets ? __('delete tickets') : __('trash tickets'),
		},
		{
			value: 'edit-prices',
			label: __('edit ticket prices'),
			disabled: isEditPricesDisabled,
		},
	]);

	const onApply = useCallback<BulkActionsProps<Action>['onApply']>(
		(action) => {
			setAction(action);
			onOpen();
		},
		[onOpen]
	);

	return (
		<Collapsible show={showBulkActions}>
			<BulkActions
				Checkbox={Checkbox}
				defaultAction=''
				id={'ee-bulk-edit-tickets-actions'}
				onApply={isEditPricesDisabled ? null : onApply}
				options={options}
			/>
			{isOpen && (
				<>
					{action === 'edit-details' && <EditDetails isOpen={true} onClose={onClose} />}
					{action === 'delete' && <Delete areTrashedTickets={areTrashedTickets} onClose={onClose} />}
					{action === 'edit-prices' && <EditPrices isOpen={true} onClose={onClose} />}
				</>
			)}

			<ErrorMessage message={isEditPricesDisabled && SOLD_TICKET_ERROR_MESSAGE} variant='subtle' />
		</Collapsible>
	);
};

export default withPermission('ee_event_editor_bulk_edit')(Actions);
