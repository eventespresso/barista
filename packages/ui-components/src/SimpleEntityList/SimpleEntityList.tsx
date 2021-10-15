import { useCallback, useState } from 'react';
import classNames from 'classnames';

import { useDisclosure } from '@eventespresso/hooks';
import type { Entity } from '@eventespresso/data';

import Container from './Container';
import { EntityTemplate } from './EntityTemplate';
import type { SimpleEntityListProps } from './types';

import './style.scss';

export const SimpleEntityList = <E extends Entity>({
	ContentRenderer,
	addEntity,
	className,
	deleteEntity,
	entities,
	EntityRenderer,
	templates,
}: SimpleEntityListProps<E>): JSX.Element => {
	const { isOpen, onClose, onOpen } = useDisclosure();
	const [currentEntity, seCurrentEntity] = useState<E>();

	const onAddNew = useCallback(() => {
		seCurrentEntity(null);
		onOpen();
	}, [onOpen]);

	const onEditEntity = useCallback(
		(entity: E) => {
			seCurrentEntity(entity);
			onOpen();
		},
		[onOpen]
	);

	const listClassName = classNames('ee-simple-entity-list', className);

	return (
		<div className={listClassName}>
			<Container ContentRenderer={ContentRenderer} onClose={onClose} isOpen={isOpen} entity={currentEntity} />
			<EntityTemplate addEntity={addEntity} templates={templates} onAddNew={onAddNew} />
			<div className='ee-simple-entity-list__wrapper'>
				{entities.map((entity) => (
					<EntityRenderer key={entity.id} entity={entity} onEdit={onEditEntity} onDelete={deleteEntity} />
				))}
			</div>
		</div>
	);
};
