import React from 'react';
import { __, sprintf } from '@eventespresso/i18n';

import './style.scss';

interface EntityOptionsRowProps {
	addNew: React.ReactNode;
	addNewID: string;
	afterOptions?: React.ReactNode;
	selectExisting: React.ReactNode;
	selectExistingID: string;
	type: 'datetime' | 'ticket';
}

const EntityOptionsRow: React.FC<EntityOptionsRowProps> = ({
	addNew,
	addNewID,
	afterOptions,
	selectExisting,
	selectExistingID,
	type,
}) => {
	const entityType = type === 'datetime' ? __('datetime') : __('ticket');
	return (
		<div className='ee-entity-option__wrapper'>
			<div className='ee-entity-option__options'>
				<div className='ee-entity-option__option'>
					<label className={'ee-focus-priority-5'} htmlFor={addNewID}>
						{
							/* translators: select an existing "date / ticket" to use as a template */
							sprintf(__('select an existing %s to use as a template.'), entityType)
						}
					</label>
					<div className='ee-entity-option__input'>{selectExisting}</div>
				</div>
				<div className='ee-entity-option__separator'>{__('or')}</div>
				<div className='ee-entity-option__option'>
					<label className={'ee-focus-priority-5'} htmlFor={selectExistingID}>
						{
							/* translators: Add new "date / ticket" and insert details manually */
							sprintf(__('Add new %s and insert details manually'), entityType)
						}
					</label>
					<div className='ee-entity-option__input'>{addNew}</div>
				</div>
			</div>
			{afterOptions}
		</div>
	);
};

export default EntityOptionsRow;
