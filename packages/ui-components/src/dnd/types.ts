import type { DragDropContextProps } from '@eventespresso/adapters';

export interface DragAndDropProps<E extends unknown = any> extends Partial<DragDropContextProps> {
	asContainer?: 'div' | 'ol' | 'ul';
	asItem?: 'div' | 'li';
	droppableId: string;
	items: Array<E>;
	renderDraggableItem: (item: E) => Partial<DraggableProps<E>>;
}

// LATER: consider replacing 'unknown' with something more narrow
export interface DraggableProps<E extends unknown = any> extends Pick<DragAndDropProps<E>, 'asItem'> {
	content: React.ReactNode;
	id: string;
	index: number;
}
