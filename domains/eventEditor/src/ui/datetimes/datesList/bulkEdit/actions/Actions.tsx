import React, { useState, useCallback } from 'react';
import { __ } from '@eventespresso/i18n';
import { useDisclosure } from '@chakra-ui/hooks';

import { BulkActions } from '@eventespresso/components';
import { useMemoStringify } from '@eventespresso/hooks';

import Checkbox from '../../tableView/Checkbox';
import { useDatesListFilterState, DatetimeStatus } from '@edtrServices/filterState';
import { EditDetails } from '../details';
import { Delete } from '../delete';

import type { BulkActionsProps } from '@eventespresso/components';

type Action = 'edit-details' | 'delete' | '';

const Actions: React.FC = () => {
	const [action, setAction] = useState<Action>('');

	const { isOpen, onOpen, onClose } = useDisclosure();

	const { status } = useDatesListFilterState();

	const areTrashedDates = status === DatetimeStatus.trashedOnly;

	const options = useMemoStringify([
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
	]);

	const onApply = useCallback<BulkActionsProps<Action>['onApply']>(
		(action) => {
			setAction(action);
			onOpen();
		},
		[onOpen]
	);

	return (
		<>
			<BulkActions Checkbox={Checkbox} defaultAction='' onApply={onApply} options={options} />
			{isOpen && (
				<>
					{action === 'edit-details' && <EditDetails isOpen={true} onClose={onClose} />}
					{action === 'delete' && <Delete areTrashedDates={areTrashedDates} onClose={onClose} />}
				</>
			)}
		</>
	);
};

export default Actions;
