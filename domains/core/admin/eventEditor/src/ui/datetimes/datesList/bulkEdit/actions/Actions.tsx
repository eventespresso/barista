import { useState, useCallback } from 'react';

import { __ } from '@eventespresso/i18n';
import { BulkActions } from '@eventespresso/ee-components';
import { DatetimeStatusFilters } from '@eventespresso/predicates';
import { USE_ADVANCED_EDITOR } from '@eventespresso/constants';
import { useBulkEdit, useFeature } from '@eventespresso/services';
import { useDatesListFilterState, hooks } from '@eventespresso/edtr-services';
import { useDisclosure, useMemoStringify } from '@eventespresso/hooks';
import { withCurrentUserCan } from '@eventespresso/services';
import type { BulkActionsProps } from '@eventespresso/ui-components';

import Checkbox from '../../tableView/Checkbox';
import { EditDetails } from '../details';
import { Delete } from '../delete';

type Action = 'edit-details' | 'delete' | '';

const actions: Array<Action> = ['edit-details', 'delete', ''];

const Actions: React.FC = () => {
	const [action, setAction] = useState<Action>('');
	const bulkEdit = useBulkEdit();
	const canUseBulkEdit = useFeature('ee_event_editor_bulk_edit');

	const { isOpen, onOpen, onClose } = useDisclosure();

	const { status } = useDatesListFilterState();

	const areTrashedDates = status === DatetimeStatusFilters.trashedOnly;

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
		canUseBulkEdit && (
			<>
				<BulkActions
					Checkbox={Checkbox}
					defaultAction=''
					id={'ee-bulk-edit-dates-actions'}
					onApply={onApply}
					options={options}
				/>
				<>
					{action === 'edit-details' && <EditDetails isOpen={isOpen} onClose={onClose} />}
					{action === 'delete' && <Delete areTrashedDates={areTrashedDates} onClose={onClose} />}
				</>
			</>
		)
	);
};

export default withCurrentUserCan(USE_ADVANCED_EDITOR)(Actions);
