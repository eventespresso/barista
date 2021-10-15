import { Plus } from '@eventespresso/icons';
import { __ } from '@eventespresso/i18n';

import { Button } from '../../Button';

import './style.scss';

interface EntityOptionsRowProps {
	onAddNew?: VoidFunction;
	selectExisting: React.ReactNode;
	selectExistingID: string;
}

export const EntityOptionsRow: React.FC<EntityOptionsRowProps> = ({ onAddNew, selectExisting, selectExistingID }) => {
	const addNewID = `ee-add-new-entity`;
	const addNewDescribedByID = `${addNewID}-description`;

	return (
		<div className='ee-entity-option__wrapper'>
			<div className='ee-entity-option__options'>
				<div className='ee-entity-option__option'>
					<label className={'ee-focus-priority-5'} htmlFor={`ee-select-${selectExistingID}`}>
						{__('Select an existing one to use as a template.')}
					</label>
					<div className='ee-entity-option__input'>{selectExisting}</div>
				</div>
				{onAddNew ? (
					<>
						<div className='ee-entity-option__separator'>{__('or')}</div>
						<div className='ee-entity-option__option'>
							<label className={'ee-focus-priority-5'} id={addNewDescribedByID}>
								{__('Add new and insert details manually')}
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
