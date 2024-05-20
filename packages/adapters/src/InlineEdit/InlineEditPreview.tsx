import * as Chakra from '@chakra-ui/react';

import type { Props } from './types';

type Component = React.FC<Props.InlineEditPreview>;

const InlineEditPreview: Component = ({ isEditing, onRequestEdit, Preview, value, ...props }) => {
	return Preview ? (
		<Preview {...props} isEditing={isEditing} onRequestEdit={onRequestEdit} value={value} />
	) : (
		<Chakra.EditablePreview />
	);
};

export default InlineEditPreview;
