import * as Chakra from '@chakra-ui/react';

import type { Component } from '.';

const Factory = () => {};

const Component: Component.Type = (props) => {
	return <Chakra.EditablePreview {...props} />;
};

const LegacyOrDefault: Component.Legacy = ({ Preview, ...props }) => {
	return Preview ? <Preview {...props} /> : <Chakra.EditablePreview />;
};

export const Preview = Object.assign(Factory, {
	Component,
	LegacyOrDefault,
});
