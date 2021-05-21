import classNames from 'classnames';
import { DragHandle, Trash } from '@eventespresso/icons';

import { IconButton } from '../Button';
import { ELEMENT_BLOCKS_INDEXED } from './constants';

import type { FormElementProps } from './types';

export const FormElementToolbar: React.FC<FormElementProps> = ({ active, element }) => {
	const menuClass = classNames('ee-form-element__menu', active && 'ee-form-element__menu--active');

	const elementTypeLabel = ELEMENT_BLOCKS_INDEXED[element.type]?.label || '';

	return (
		<>
			<div className={menuClass}>
				<div className='ee-form-element__type'>{elementTypeLabel}</div>
				<div className='ee-form-element__actions'>
					<IconButton icon={Trash} borderless size='smaller' transparentBg />
					<IconButton icon={DragHandle} borderless className='ee-drag-handle' size='smaller' transparentBg />
				</div>
			</div>
		</>
	);
};
