import React from 'react';

import { SimpleTextEditor as SimpleTextEditorAdapter } from '@eventespresso/rich-text-editor';
import withoutMetaProp from './withoutMetaProp';
import type { FieldRendererProps } from '../types';

const SimpleTextEditor: React.FC<FieldRendererProps> = ({ input, ...props }) => {
	return <SimpleTextEditorAdapter {...input} {...props} />;
};

export default withoutMetaProp(SimpleTextEditor);
