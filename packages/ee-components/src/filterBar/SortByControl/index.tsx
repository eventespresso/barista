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
		(entityType === 'datetimes' && __('set custom dates order')) ||
		(entityType === 'tickets' && __('set custom tickets order'));
	const title =
		(entityType === 'datetimes' && __('Set Custom Dates Order - this is how dates are ordered on the frontend')) ||
		(entityType === 'tickets' && __('Set Custom Tickets Order - this is how tickets are ordered on the frontend'));

	const onSubmitHandler = useCallback(() => {
		onChangeValue('order');
		onSubmit();
		onClose();
	}, [onChangeValue, onClose, onSubmit]);

	const showReorderButton = value === 'order';
	const reorderButton = showReorderButton && (
		<Button buttonText={text} icon={Sort} onClick={onOpen} noMargin size='small' />
	);

	return (
		<>
			<div className='ee-sort-by-control'>
				<SelectWithLabel id={id} label={label} options={options} onChangeValue={onChangeValue} value={value} />
				{reorderButton}
			</div>
			<ModalWithAlert
				className='ee-filter-bar-modal__reorder-entitites'
				isOpen={isOpen}
				onCancel={onClose}
				onClose={onClose}
				onSubmit={onSubmitHandler}
				showAlertOnClose={false}
				title={title}
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
