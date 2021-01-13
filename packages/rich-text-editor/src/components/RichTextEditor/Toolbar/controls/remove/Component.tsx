import { useCallback } from 'react';

import { ToolbarItem } from '../../ToolbarItem';
import { ToolbarItemProps } from '../../types';

const Component: React.FC<ToolbarItemProps<'remove'>> = ({ toolbar, onChange, config }) => {
	const onClick = useCallback(() => {
		onChange('');
	}, [onChange]);

	return (
		<ToolbarItem {...toolbar} onClick={onClick}>
			{config.icon && <config.icon />}
		</ToolbarItem>
	);
};

export default Component;
