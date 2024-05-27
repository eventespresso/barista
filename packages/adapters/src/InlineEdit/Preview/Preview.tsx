import * as Chakra from '@chakra-ui/react';

import type { Component } from './types';
import { useMemo } from 'react';
import { convertToLegacyProps } from './convertToLegacyProps';

export const Preview: Component.Factory = ({ Component, Legacy, ...props }) => {
	const state = Chakra.useEditableState();

	const legacyProps = useMemo(() => {
		return convertToLegacyProps(props);
	}, [props]);

	if (Legacy) {
		return <Legacy {...legacyProps} onRequestEdit={state.onEdit} isEditing={state.isEditing} />;
	}

	if (Component) {
		return <Component {...props} {...state} />;
	}

	return <Chakra.EditablePreview />;
};
