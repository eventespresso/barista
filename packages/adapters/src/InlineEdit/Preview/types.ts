import type React from 'react';
import type { EditablePreviewProps, UseEditableReturn } from '@chakra-ui/react';

import type { TooltipProps } from '../../Tooltip';
import type { Legacy } from '.';

// LATER: once deprecation is done:
//   - remove 'onRequestEdit' in 'Props.Type'

export module Props {
	export type Type = EditablePreviewProps & {
		onRequestEdit?: () => void;
		isEditing?: UseEditableReturn['isEditing'];
		value?: UseEditableReturn['value'];
		tooltip?: TooltipProps['tooltip'];
	};

	export type Legacy = Legacy.InlineEditPreviewProps;

	// require either of properties but do not allow both
	export type Factory =
		| (Props.Type & {
				Component: Component.Type;
				Legacy?: never;
		  })
		| (Props.Type & {
				Component?: never;
				Legacy: Component.Legacy;
		  });
}

export module Component {
	export type Type = React.FC<Props.Type>;
	export type Legacy = React.ComponentType<Props.Legacy>;
	export type Factory = React.FC<Props.Factory>;
}

export module ConvertToLegacyProps {
	export type Fn = (parameters: Parameters) => Props.Legacy;
	export type Props = Props.Legacy;

	type Parameters = Omit<Props.Factory, 'Component' | 'Legacy'>;
}
