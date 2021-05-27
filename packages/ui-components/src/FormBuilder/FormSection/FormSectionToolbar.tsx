import { useCallback } from 'react';

import { __ } from '@eventespresso/i18n';
import { Copy, DragHandle, Save, SettingsOutlined, Trash } from '@eventespresso/icons';

import { IconButton } from '../../Button';
import { useFormState } from '../state';

import type { FormSectionProps } from '../types';

export const FormSectionToolbar: React.FC<FormSectionProps> = ({ formSection }) => {
	const { copySection, deleteSection, isElementOpen, toggleOpenElement } = useFormState();

	const active = isElementOpen(formSection.UUID);

	const onCopy = useCallback(() => copySection(formSection.UUID), [copySection, formSection.UUID]);
	const onDelete = useCallback(() => deleteSection(formSection.UUID), [deleteSection, formSection.UUID]);
	const onToggle = useCallback(() => toggleOpenElement(formSection.UUID), [formSection.UUID, toggleOpenElement]);

	const tabIndex = active ? 0 : -1;

	return (
		<div className={'ee-form-section__toolbar'}>
			<div className='ee-form-section__toolbar-actions'>
				<IconButton
					icon={SettingsOutlined}
					active={active}
					borderless
					className='ee-form-section__menu-button'
					onClick={onToggle}
					size='smaller'
					tooltip={__('click to view form section settings')}
					transparentBg
				/>
				<IconButton
					icon={Copy}
					borderless
					onClick={onCopy}
					size='smaller'
					tabIndex={tabIndex}
					tooltip={__('click to copy this form section')}
					transparentBg
				/>
				<IconButton
					icon={Save}
					borderless
					// onClick={onSave}
					size='smaller'
					tabIndex={tabIndex}
					tooltip={__('click to save this form section for use in other forms')}
					transparentBg
				/>
				<IconButton
					icon={Trash}
					borderless
					onClick={onDelete}
					size='small'
					tabIndex={tabIndex}
					tooltip={__('click to delete this form section')}
					transparentBg
				/>
				<IconButton
					icon={DragHandle}
					borderless
					className='ee-drag-handle'
					size='small'
					tabIndex={tabIndex}
					tooltip={__('click, hold, and drag to reorder this form section')}
					transparentBg
				/>
			</div>
		</div>
	);
};
