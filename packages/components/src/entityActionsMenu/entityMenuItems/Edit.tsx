import React from 'react';
import { __ } from '@wordpress/i18n';

import { DropdownMenuItem } from '../../dropdownMenu';
import { Edit as EditIcon } from '@eventespresso/icons';
import { MenuItemProps } from './types';

const Edit: React.FC<MenuItemProps> = ({ onClick, ...props }) => {
	const title = props.title || __('edit');
	return <DropdownMenuItem {...props} icon={EditIcon} onClick={onClick} title={title} />;
};

export default Edit;
