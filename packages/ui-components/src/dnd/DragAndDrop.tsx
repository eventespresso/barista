import classNames from 'classnames';

import { DragDropContext, Droppable } from '@eventespresso/adapters';
import { Draggable } from './Draggable';

import { DragAndDropProps } from './types';
import './style.scss';

export const DragAndDrop = <E extends any>({
	asContainer: AsContainer = 'div',
	asItem = 'div',
	droppableId,
	items,
	onBeforeDragStart,
	onDragEnd,
	onDragStart,
	onDragUpdate,
	renderDraggableItem,
}: DragAndDropProps<E>) => {
	const draggableItems = items.map(renderDraggableItem).map((item, index) => {
		if (!item.hasOwnProperty('id')) {
			console.error('Entity is missing the "id" property', item);
		}
		return <Draggable asItem={asItem} content={item.content} id={item?.id} index={index} key={item?.id} />;
	});

	return (
		<DragDropContext
			onBeforeDragStart={onBeforeDragStart}
			onDragStart={onDragStart}
			onDragUpdate={onDragUpdate}
			onDragEnd={onDragEnd}
		>
			<Droppable droppableId={droppableId}>
				{({ innerRef, droppableProps, placeholder }, { isDraggingOver }) => {
					const className = classNames('ee-droppable', isDraggingOver && 'ee-droppable--is-dragging-over');

					return (
						<AsContainer {...droppableProps} className={className} ref={innerRef}>
							{draggableItems}
							{placeholder}
						</AsContainer>
					);
				}}
			</Droppable>
		</DragDropContext>
	);
};
