import { useMemo } from 'react';
import classNames from 'classnames';

import { DragDropContext, Droppable } from '@eventespresso/adapters';
import { Container } from '@eventespresso/ui-components';

import { FormSections } from './FormSection';
import { withFormState } from './context';
import { useFormState, useHandleDnD } from './state';
import { useSaveForm } from './data';
import { SECTIONS_DROPPABLE_ID } from './constants';

import type { FormBuilderProps } from './types';

import './styles.scss';

const FormBuilder: React.FC<FormBuilderProps> = ({
	bodyClassName,
	containerClassName,
	contentClassName,
	header,
	topBanner: TopBanner,
}) => {
	const { getSections, getData } = useFormState();

	// handle save form
	useSaveForm();

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
			{TopBanner && <TopBanner {...getData()} />}
			<DragDropContext onDragEnd={handleDnD}>
				<Droppable droppableId={SECTIONS_DROPPABLE_ID} type='section'>
					{({ innerRef, droppableProps, placeholder }, { isDraggingOver }) => {
						const className = classNames(
							'ee-droppable',
							isDraggingOver && 'ee-droppable--is-dragging-over'
						);

						return (
							<div {...droppableProps} className={className} ref={innerRef}>
								<FormSections formSections={getSections()} />
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
