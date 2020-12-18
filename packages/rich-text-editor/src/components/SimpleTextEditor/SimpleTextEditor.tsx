import React from 'react';
import classNames from 'classnames';

import { RichTextEditor } from '../RichTextEditor';
import { SimpleTextEditorProps } from './types';
import { toolbar } from './toolbar';

export const SimpleTextEditor: React.FC<SimpleTextEditorProps> = (props) => {
	const wrapperClassName = classNames('ee-simple-text-editor', props.wrapperClassName);

	return <RichTextEditor {...props} wrapperClassName={wrapperClassName} toolbar={toolbar} />;
};
