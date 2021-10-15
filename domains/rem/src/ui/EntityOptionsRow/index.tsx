import { Plus } from '@eventespresso/icons';
import { Button } from '@eventespresso/ui-components';
import { __, sprintf } from '@eventespresso/i18n';
import './style.scss';

interface EntityOptionsRowProps {
	hideAddNew?: boolean;
	onAddNew: VoidFunction;
	selectExisting: React.ReactNode;
	selectExistingID: string;
	type: 'datetime' | 'ticket';
}

export const EntityOptionsRow: React.FC<EntityOptionsRowProps> = ({
	hideAddNew,
	onAddNew,
	selectExisting,
	selectExistingID,
	type,
}) => {
	const entityType = type === 'datetime' ? __('datetime') : __('ticket');
	const addNewID = `ee-add-new-${type}`;
	const addNewDescribedByID = `${addNewID}-description`;

	return (
		<div className='ee-entity-option__wrapper'>
			<div className={`ee-entity-option__options${hideAddNew ? '--single' : ''}`}>
				<div className='ee-entity-option__option'>
					<label className={'ee-focus-priority-5'} htmlFor={`ee-select-${selectExistingID}`}>
						{
							/* translators: Select an existing "date / ticket" to use as a template */
							sprintf(__('Select an existing %s to use as a template.'), entityType)
						}
					</label>
					<div className='ee-entity-option__input'>{selectExisting}</div>
				</div>
				{!hideAddNew && (
					<>
						<div className='ee-entity-option__separator'>{__('or')}</div>
						<div className='ee-entity-option__option'>
							<label className={'ee-focus-priority-5'} id={addNewDescribedByID}>
								{
									/* translators: Add new "date / ticket" and insert details manually */
									sprintf(__('Add new %s and insert details manually'), entityType)
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
				)}
			</div>
		</div>
	);
};
