import { __ } from '@eventespresso/i18n';
import { Trash as TrashIcon } from '@eventespresso/icons';

import { DropdownMenuItem } from '../../DropdownMenu';
import type { MenuItemProps } from './types';

const TrashEntity: React.FC<MenuItemProps> = ({ onClick, ...props }) => {
	const title = props.title || __('trash');

	return <DropdownMenuItem {...props} icon={TrashIcon} onClick={onClick} title={title} />;
};

export default TrashEntity;
