import { __ } from '@eventespresso/i18n';

import { DropdownMenuItem } from '../../DropdownMenu';
import { Edit as EditIcon } from '@eventespresso/icons';
import type { MenuItemProps } from './types';

const EditEntity: React.FC<MenuItemProps> = ({ onClick, ...props }) => {
	const title = props.title || __('edit');
	return <DropdownMenuItem {...props} icon={EditIcon} onClick={onClick} title={title} />;
};

export default EditEntity;
