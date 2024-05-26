import type { ConvertToLegacyProps } from './types';

export const convertToLegacyProps: ConvertToLegacyProps.Fn = ({ defaultValue, placeholder, ...rest }) => {
	const props: ConvertToLegacyProps.Props = rest;
	if (placeholder) props.placeholder = placeholder;
	if (defaultValue && !Array.isArray(defaultValue)) {
		props.defaultValue = defaultValue.toString();
	}
	return props;
};
