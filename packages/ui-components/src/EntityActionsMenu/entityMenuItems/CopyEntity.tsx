import { __ } from '@eventespresso/i18n';

import { DropdownMenuItem } from '../../DropdownMenu';
import { Copy as CopyIcon } from '@eventespresso/icons';
import type { MenuItemProps } from './types';

const CopyEntity: React.FC<MenuItemProps> = ({ onClick, ...props }) => {
	const title = props.title || __('copy');
	return <DropdownMenuItem {...props} icon={CopyIcon} onClick={onClick} title={title} />;
};

export default CopyEntity;
