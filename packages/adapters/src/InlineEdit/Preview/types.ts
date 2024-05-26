import type React from 'react';
import type { EditablePreviewProps, UseEditableReturn } from '@chakra-ui/react';

import type { TooltipProps } from '../../Tooltip';
import type { Legacy } from '.';

// LATER: once deprecation is done:
//   - remove 'onRequestEdit' in 'Props.Type'

export module Props {
	export type Type = Default & {
		onRequestEdit?: () => void;
		isEditing?: UseEditableReturn['isEditing'];
		value?: UseEditableReturn['value'];
		tooltip?: TooltipProps['tooltip'];
	};

	export type Legacy = Legacy.InlineEditPreviewProps;
	export type Default = EditablePreviewProps;
}

export module Component {
	export type Type = React.FC<Props.Type>;
	export type Legacy = React.FC<Props.Legacy>;
	export type Default = React.FC<Props.Default>;
}
