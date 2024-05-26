import * as Chakra from '@chakra-ui/react';

import type { Component } from './types';
import { useMemo } from 'react';
import { convertToLegacyProps } from './convertToLegacyProps';

export const Preview: Component.Factory = ({ Component, Legacy, ...props }) => {
	const legacyProps = useMemo(() => {
		return convertToLegacyProps(props);
	}, [props]);

	if (Legacy) {
		return <Legacy {...legacyProps} />;
	}

	if (Component) {
		return <Component {...props} />;
	}

	return <Chakra.EditablePreview />;
};
