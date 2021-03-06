import { useCallback, useMemo } from 'react';

import { __ } from '@eventespresso/i18n';
import {
	DropdownMenu,
	DropdownToggleProps,
	Copy,
	Edit,
	Trash,
	useConfirmationDialog,
} from '@eventespresso/ui-components';
import { EdtrGlobalModals, useDatesListFilterState } from '@eventespresso/edtr-services';
import { useGlobalModal } from '@eventespresso/registry';
import type { EntityEditModalData } from '@edtrUI/types';

import useActions from './useActions';
import type { DateMainMenuProps } from './types';

const DateMainMenu: React.FC<DateMainMenuProps> = ({ datetime }) => {
	const { copyDate, trashDate, isTrashed } = useActions(datetime.id);
	const { openWithData } = useGlobalModal<EntityEditModalData>(EdtrGlobalModals.EDIT_DATE);

	const isTheOnlyDate = useDatesListFilterState().total === 1;

	const title = isTrashed ? __('Permanently delete Datetime?') : __('Move Datetime to Trash?');
	const message = isTrashed
		? __(
				'Are you sure you want to permanently delete this datetime? This action is permanent and can not be undone.'
		  )
		: __(
				'Are you sure you want to move this datetime to the trash? You can "untrash" this datetime later if you need to.'
		  );
	const { confirmationDialog, onOpen } = useConfirmationDialog({
		message,
		title,
		onConfirm: trashDate,
	});

	const trashDateTitle = isTrashed ? __('delete permanently') : __('trash datetime');

	const toggleProps: DropdownToggleProps = useMemo(
		() => ({
			className: 'ee-date-main-menu',
			'data-testid': `ee-datetime-main-menu-${datetime.dbId}`,
			tooltip: __('event date main menu'),
		}),
		[datetime.dbId]
	);

	const onOpenEditModal = useCallback(() => {
		openWithData({ entityId: datetime.id });
	}, [datetime.id, openWithData]);

	const cannotBeDeleted = isTrashed && isTheOnlyDate;

	return (
		<>
			<DropdownMenu toggleProps={toggleProps}>
				<Edit onClick={onOpenEditModal} title={__('edit datetime')} />
				<Copy onClick={copyDate} title={__('copy datetime')} />
				<Trash
					data-testid={`ee-trash-date-${datetime.dbId}`}
					onClick={onOpen}
					title={trashDateTitle}
					isDisabled={cannotBeDeleted}
				/>
			</DropdownMenu>
			{confirmationDialog}
		</>
	);
};

export default DateMainMenu;
