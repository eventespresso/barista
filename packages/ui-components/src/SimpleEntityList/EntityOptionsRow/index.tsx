import { Plus } from '@eventespresso/icons';
import { __, sprintf } from '@eventespresso/i18n';

import { Button } from '../../Button';

import './style.scss';

interface EntityOptionsRowProps {
	entityType: string;
	onAddNew?: VoidFunction;
	selectExisting: React.ReactNode;
	selectExistingID: string;
}

export const EntityOptionsRow: React.FC<EntityOptionsRowProps> = ({
	entityType,
	onAddNew,
	selectExisting,
	selectExistingID,
}) => {
	const addNewID = `ee-add-new-entity`;
	const addNewDescribedByID = `${addNewID}-description`;

	return (
		<div className='ee-entity-option__wrapper'>
			<div className='ee-entity-option__options'>
				<div className='ee-entity-option__option'>
					<label className={'ee-focus-priority-5'} htmlFor={`ee-select-${selectExistingID}`}>
						{
							/* translators: entity type to select */
							sprintf(__('Select an existing %s to use as a template.'), entityType)
						}
					</label>
					<div className='ee-entity-option__input'>{selectExisting}</div>
				</div>
				{onAddNew ? (
					<>
						<div className='ee-entity-option__separator'>{__('or')}</div>
						<div className='ee-entity-option__option'>
							<label className={'ee-focus-priority-5'} id={addNewDescribedByID}>
								{
									/* translators: entity type to add */
									sprintf(__('Add a new %s and insert details manually'), entityType)
								}
							</label>
							<Button
								aria-describedby={addNewDescribedByID}
								buttonText={__('Add New')}
								icon={Plus}
								id={addNewID}
								onClick={onAddNew}
							/>
						</div>
					</>
				) : null}
			</div>
		</div>
	);
};
