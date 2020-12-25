import { useCallback, useState, useMemo } from 'react';

import classNames from 'classnames';

import { Dotdotdot } from '@eventespresso/adapters';
import { Edit } from '@eventespresso/icons';
import { useDisclosure } from '@eventespresso/hooks';
import { SimpleTextEditor } from '@eventespresso/rich-text-editor';
import { TabbableText, ModalWithAlert } from '@eventespresso/ui-components';

import type { SimpleTextEditorModalProps } from './types';

import './style.scss';

export const SimpleTextEditorModal: React.FC<SimpleTextEditorModalProps> = ({
	className,
	onUpdate,
	title,
	tooltip,
	...props
}) => {
	const [text, setText] = useState(props.text);
	const { isOpen, onOpen, onClose } = useDisclosure();

	const hasChanges = text !== props.text;
	const previewClassName = classNames('ee-inline-edit__preview', className && className);

	const onChange = useCallback(
		(newText: string): void => {
			const newTextValue = newText !== '<p></p>' ? newText : '';
			setText(newTextValue);
		},
		[setText]
	);

	const onSubmit = useCallback((): void => {
		if (hasChanges) {
			onUpdate(text);
		}
		onClose();
	}, [onClose, onUpdate, hasChanges, text]);

	const onCancel = useCallback((): void => {
		// restore the initial text for preview
		setText(props.text);
		onClose();
	}, [onClose, props.text]);

	const previewProps = useMemo(() => {
		return { dangerouslySetInnerHTML: { __html: text } };
	}, [text]);

	const preview = (
		<Dotdotdot clamp={4}>
			<div {...previewProps} />
		</Dotdotdot>
	);

	return (
		<>
			<ModalWithAlert
				className='ee-simple-text-editor-modal'
				isOpen={isOpen}
				onCancel={onCancel}
				onClose={onCancel}
				onSubmit={onSubmit}
				showAlertOnClose={hasChanges}
				title={title}
			>
				<SimpleTextEditor onChange={onChange} defaultValue={props.text} />
			</ModalWithAlert>
			<div className='ee-simple-text-editor__preview'>
				<TabbableText
					className={previewClassName}
					icon={<Edit className={'ee-inline-edit__edit-icon'} />}
					onClick={onOpen}
					text={preview}
					tooltip={tooltip}
				/>
			</div>
		</>
	);
};
