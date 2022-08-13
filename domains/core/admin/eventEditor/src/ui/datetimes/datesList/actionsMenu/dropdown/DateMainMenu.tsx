import { useCallback, useMemo } from 'react';

import { __ } from '@eventespresso/i18n';
import { CopyEntity, DropdownMenu, DropdownToggleProps, EditEntity } from '@eventespresso/ui-components';
import { EdtrGlobalModals } from '@eventespresso/edtr-services';
import { useGlobalModal } from '@eventespresso/registry';
import type { EntityEditModalData } from '@edtrUI/types';

import { DeleteDatetime } from './DeleteDatetime';
import useActions from './useActions';
import type { DateMainMenuProps } from './types';

const DateMainMenu: React.FC<DateMainMenuProps> = ({ datetime }) => {
	const { copyDate } = useActions(datetime.id);
	const { openWithData } = useGlobalModal<EntityEditModalData>(EdtrGlobalModals.EDIT_DATE);

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

	return (
		<>
			<DropdownMenu toggleProps={toggleProps}>
				<EditEntity onClick={onOpenEditModal} title={__('edit datetime')} />
				<CopyEntity onClick={copyDate} title={__('copy datetime')} />
				<DeleteDatetime datetime={datetime} />
			</DropdownMenu>
		</>
	);
};

export default DateMainMenu;
