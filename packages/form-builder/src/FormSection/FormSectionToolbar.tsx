import { useCallback, useMemo, memo } from 'react';

import { __ } from '@eventespresso/i18n';
import { Copy, DragHandle, SettingsOutlined, Trash } from '@eventespresso/icons';
import { IconButton, ButtonProps, ConfirmDelete } from '@eventespresso/ui-components';
import { getPropsAreEqual } from '@eventespresso/utils';

import { useFormState } from '../state';
import { SaveSection } from './SaveSection';

import type { FormSectionToolbarProps } from '../types';

export const FormSectionToolbar = memo<FormSectionToolbarProps>(({ formSection, dragHandleProps }) => {
	const { copySection, deleteSection, isElementOpen, isTopLevelSection, toggleOpenElement } = useFormState();

	const { id } = formSection;
	const active = isElementOpen({ id });

	const onCopy = useCallback(() => copySection({ id, section: {}, afterId: '' }), [id, copySection]);
	const onDelete = useCallback(() => deleteSection({ id }), [id, deleteSection]);
	const onToggle = useCallback(() => toggleOpenElement({ openElement: id }), [id, toggleOpenElement]);

	const tabIndex = active ? 0 : -1;

	const deleteButtonProps = useMemo<ButtonProps>(
		() => ({
			icon: Trash,
			borderless: true,
			className: 'ee-form-section__toolbar-button',
			size: 'small',
			tabIndex,
			tooltip: __('delete form section'),
			transparentBg: true,
		}),
		[tabIndex]
	);

	return (
		<div className={'ee-form-section__toolbar'}>
			<IconButton
				icon={SettingsOutlined}
				active={active}
				borderless
				className='ee-form-section__menu-button ee-form-section__toolbar-button'
				onClick={onToggle}
				size='smaller'
				tooltip={__('form section settings')}
				transparentBg
			/>
			<IconButton
				icon={Copy}
				borderless
				className='ee-form-section__toolbar-button'
				onClick={onCopy}
				size='smaller'
				tabIndex={tabIndex}
				tooltip={__('copy form section')}
				transparentBg
			/>
			<SaveSection formSection={formSection} />

			{
				// Hide delete button for top level section
				!isTopLevelSection({ id: formSection.id }) && (
					<ConfirmDelete asIconButton onConfirm={onDelete} buttonProps={deleteButtonProps} />
				)
			}
			<IconButton
				icon={DragHandle}
				borderless
				className='ee-drag-handle ee-form-section__toolbar-button'
				size='small'
				tabIndex={tabIndex}
				tooltip={__('click, hold, and drag to reorder form section')}
				transparentBg
				{...dragHandleProps}
			/>
		</div>
	);
}, getPropsAreEqual([['formSection']]));
