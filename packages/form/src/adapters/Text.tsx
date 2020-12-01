import React from 'react';

import { TextInput } from '../../../components/src/text-input/TextInput';
import type { FieldRendererProps } from '../types';

const Text: React.FC<FieldRendererProps> = ({ htmlType = 'text', input, ...props }) => {
	return <TextInput {...input} {...props} type={htmlType} />;
};

export default Text;
