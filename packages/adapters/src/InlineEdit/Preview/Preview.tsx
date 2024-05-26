import * as Chakra from '@chakra-ui/react';

import type { Component } from '.';

const Component: Component.Type = (props) => {
	return <>TODO:</>;
};

const LegacyOrDefault: Component.Legacy = ({ Preview, ...props }) => {
	return Preview ? <Preview {...props} /> : <Chakra.EditablePreview />;
};

export const Preview = Object.assign(
	{},
	{
		Component,
		LegacyOrDefault,
	}
);
