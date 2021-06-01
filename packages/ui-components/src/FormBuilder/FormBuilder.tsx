import { useMemo } from 'react';
import classNames from 'classnames';

import { DragDropContext, Droppable } from '@eventespresso/adapters';

import { Container } from '../Container';
import { FormSection } from './FormSection';
import { withFormState } from './context';
import { useFormState, useHandleDnD } from './state';
import { SECTIONS_DROPPABLE_ID } from './constants';

import type { FormBuilderProps } from './types';

import './styles.scss';

const FormBuilder: React.FC<FormBuilderProps> = ({ bodyClassName, containerClassName, contentClassName, header }) => {
	const { getSections } = useFormState();

	const bodyClass = classNames('ee-form-builder__wrapper', bodyClassName);
	const contentClass = classNames('ee-form-builder__form', contentClassName);
	const containerClass = classNames('ee-form-builder', containerClassName);

	const classes = useMemo(() => {
		return {
			body: bodyClass,
			container: containerClass,
			content: contentClass,
		};
	}, [bodyClass, containerClass, contentClass]);

	const handleDnD = useHandleDnD();

	return (
		<Container classes={classes} header={header}>
			<DragDropContext onDragEnd={handleDnD}>
				<Droppable droppableId={SECTIONS_DROPPABLE_ID} type='section'>
					{({ innerRef, droppableProps, placeholder }, { isDraggingOver }) => {
						const className = classNames(
							'ee-droppable',
							isDraggingOver && 'ee-droppable--is-dragging-over'
						);

						return (
							<div {...droppableProps} className={className} ref={innerRef}>
								{getSections().map((formSection, index) => (
									<FormSection key={formSection.UUID} formSection={formSection} index={index} />
								))}
								{placeholder}
							</div>
						);
					}}
				</Droppable>
			</DragDropContext>
		</Container>
	);
};

export default withFormState(FormBuilder);
