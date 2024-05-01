import type { Entity } from '@eventespresso/data';
import type { ModalProps } from '@eventespresso/adapters';

export interface EntityEditBaseProps<E extends Entity> {
	entity: E;
}

export interface EntityEditModalProps extends Partial<ModalProps> {}

export interface EntityEditModalContainerProps<E extends Entity>
	extends EntityEditBaseProps<E>,
		Omit<EntityEditModalProps, 'onClose'> {
	component: React.ComponentType<
		EntityEditBaseProps<E> & {
			onClose: VoidFunction;
		}
	>;
	onClose?: VoidFunction;
}
