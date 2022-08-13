import { __ } from '@eventespresso/i18n';
import { AlertType, TrashEntity, useConfirmationDialog } from '@eventespresso/ui-components';
import { Trash as TrashIcon } from '@eventespresso/icons';
import { useDatesListFilterState } from '@eventespresso/edtr-services';
import useActions from './useActions';
import type { Datetime } from '@eventespresso/edtr-services';

export interface DeleteDatetimeProps {
	datetime: Datetime;
}

export const DeleteDatetime: React.FC<DeleteDatetimeProps> = ({ datetime }) => {
	const { trashDate, isTrashed } = useActions(datetime.id);
	const isTheOnlyDate = useDatesListFilterState().total === 1;
	const trashDateTitle = isTrashed ? __('delete permanently') : __('trash datetime');
	const cannotBeDeleted = isTrashed && isTheOnlyDate;

	const title = isTrashed ? __('Permanently Delete Datetime?') : __('Move Datetime to Trash?');
	const message = isTrashed
		? __(
				'Are you sure you want to permanently delete this datetime? This action is permanent and can not be undone.'
		  )
		: __(
				'Are you sure you want to move this datetime to the trash? You can "untrash" this datetime later if you need to.'
		  );
	const { confirmationDialog, onOpen } = useConfirmationDialog({
		addIconBG: true,
		alertType: AlertType.ACCENT,
		icon: TrashIcon,
		message,
		title,
		onConfirm: trashDate,
		yesButtonText: __('delete'),
	});

	return (
		<>
			<TrashEntity
				data-testid={`ee-trash-date-${datetime.dbId}`}
				onClick={onOpen}
				title={trashDateTitle}
				isDisabled={cannotBeDeleted}
			/>
			{confirmationDialog}
		</>
	);
};
