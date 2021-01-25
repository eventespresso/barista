import { __ } from '@eventespresso/i18n';

import { IconButton, IconButtonProps } from '@eventespresso/ui-components';
import { Trash as TrashIcon } from '@eventespresso/icons';

const Trash: React.FC<IconButtonProps> = ({ onClick }) => {
	return <IconButton borderless icon={TrashIcon} onClick={onClick} tooltip={__('trash ticket')} />;
};

export default Trash;
