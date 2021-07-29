import { useCallback } from 'react';

import { __ } from '@eventespresso/i18n';
import { Button, DragAndDrop, ModalWithAlert, SelectWithLabel } from '@eventespresso/ui-components';
import { useDisclosure } from '@eventespresso/hooks';
import { Sort } from '@eventespresso/icons';

import type { SortByControlProps } from './types';

import './style.scss';

export const SortByControl: React.FC<SortByControlProps> = ({
	draggableItems,
	droppableId,
	entityType,
	id,
	label,
	onChangeValue,
	onSort,
	onSubmit,
	options,
	renderDraggableItem,
	value,
}) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const text =
		(entityType === 'datetimes' && __('reorder dates')) || (entityType === 'tickets' && __('reorder tickets'));

	const onSubmitHandler = useCallback(() => {
		onChangeValue('order');
		onSubmit();
		onClose();
	}, [onChangeValue, onClose, onSubmit]);

	return (
		<>
			<div className='ee-sort-by-control'>
				<SelectWithLabel id={id} label={label} options={options} onChangeValue={onChangeValue} value={value} />
				<Button buttonText={text} icon={Sort} onClick={onOpen} noMargin size='small' />
			</div>
			<ModalWithAlert
				className='ee-filter-bar-modal__reorder-entitites'
				isOpen={isOpen}
				onCancel={onClose}
				onClose={onClose}
				onSubmit={onSubmitHandler}
				showAlertOnClose={false}
				title={text}
			>
				<DragAndDrop
					asContainer='ul'
					asItem='li'
					droppableId={droppableId}
					items={draggableItems}
					onDragEnd={onSort}
					renderDraggableItem={renderDraggableItem}
				/>
			</ModalWithAlert>
		</>
	);
};

export type { SortByControlProps };
