import { DOMAttributes, useCallback } from 'react';
import { Toolbar as ReakitToolbar } from 'reakit/Toolbar';

import { IconButton } from '@eventespresso/ui-components';
import { AlignCenter, AlignLeft, AlignRight } from '@eventespresso/icons';
import { __ } from '@eventespresso/i18n';

import { ToolbarProps } from './types';
import { ToolbarItem } from '../../Toolbar';

const alignmentWithIcons = {
	left: AlignLeft,
	center: AlignCenter,
	right: AlignRight,
};

const Toolbar: React.FC<ToolbarProps> = ({ align, setAlignment, toolbar }) => {
	const onKeyPress = useCallback<DOMAttributes<HTMLButtonElement>['onKeyPress']>((event) => {
		event.preventDefault();
	}, []);

	const getOnClick = useCallback(
		(alignment): DOMAttributes<HTMLButtonElement>['onClick'] => (event) => {
			event.preventDefault();
			setAlignment(alignment);
		},
		[setAlignment]
	);

	return (
		<ReakitToolbar {...toolbar} className='ee-rich-text-editor__image-toolbar' aria-label={__('Image toolbar')}>
			{Object.entries(alignmentWithIcons).map(([alignment, Icon]) => {
				return (
					<ToolbarItem
						{...toolbar}
						as={IconButton}
						borderless
						icon={Icon}
						isActive={align === alignment}
						key={alignment}
						onClick={getOnClick(alignment)}
						onKeyPress={onKeyPress}
					/>
				);
			})}
		</ReakitToolbar>
	);
};

export default Toolbar;
