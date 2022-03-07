import { useState, useCallback } from 'react';

import { __ } from '@eventespresso/i18n';

import { BulkActions } from '@eventespresso/ee-components';
import { Collapsible } from '@eventespresso/ui-components';
import { useDisclosure, useMemoStringify } from '@eventespresso/hooks';
import { withFeature } from '@eventespresso/services';
import { useDatesListFilterState, hooks } from '@eventespresso/edtr-services';
import { DatetimeStatus } from '@eventespresso/predicates';
import { useBulkEdit } from '@eventespresso/services';
import type { BulkActionsProps } from '@eventespresso/ui-components';

import Checkbox from '../../tableView/Checkbox';
import { EditDetails } from '../details';
import { Delete } from '../delete';

type Action = 'edit-details' | 'delete' | '';

const actions: Array<Action> = ['edit-details', 'delete', ''];

const Actions: React.FC = () => {
	const [action, setAction] = useState<Action>('');
	const bulkEdit = useBulkEdit();

	const { isOpen, onOpen, onClose } = useDisclosure();

	const { status, showBulkActions } = useDatesListFilterState();

	const areTrashedDates = status === DatetimeStatus.trashedOnly;

	const options = useMemoStringify(
		hooks.applyFilters('eventEditor.datetimes.bulkEdit.actions', [
			{
				value: '',
				label: __('bulk actions'),
			},
			{
				value: 'edit-details',
				label: __('edit datetime details'),
			},
			{
				value: 'delete',
				label: areTrashedDates ? __('delete datetimes') : __('trash datetimes'),
			},
		])
	);

	const onApply = useCallback<BulkActionsProps<Action>['onApply']>(
		(newAction) => {
			setAction(newAction);
			// if it's a core action
			if (actions.includes(newAction)) {
				onOpen();
			}
			hooks.doAction('eventEditor.datetimes.bulkEdit.apply', newAction, bulkEdit);
		},
		[bulkEdit, onOpen]
	);

	return (
		<Collapsible show={showBulkActions}>
			<BulkActions
				Checkbox={Checkbox}
				defaultAction=''
				id={'ee-bulk-edit-dates-actions'}
				onApply={onApply}
				options={options}
			/>
			{isOpen && (
				<>
					{action === 'edit-details' && <EditDetails isOpen={true} onClose={onClose} />}
					{action === 'delete' && <Delete areTrashedDates={areTrashedDates} onClose={onClose} />}
				</>
			)}
		</Collapsible>
	);
};

export default withFeature('ee_event_editor_bulk_edit')(Actions);
