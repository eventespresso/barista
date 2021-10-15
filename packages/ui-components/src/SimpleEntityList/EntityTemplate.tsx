import { useState, useCallback, useMemo } from 'react';

import { __ } from '@eventespresso/i18n';
import { entityListToSelectOptions } from '@eventespresso/utils';
import type { Entity } from '@eventespresso/data';

import { Button } from '../Button';
import { Select } from '../Select';
import { EntityOptionsRow } from './EntityOptionsRow';
import { EntityTemplateProps } from './types';

export const EntityTemplate = <E extends Entity>({ addEntity, templates, onAddNew }: EntityTemplateProps<E>) => {
	const [selectedEntityId, setSelectedEntityId] = useState('');

	const onChangeValue = useCallback((value) => setSelectedEntityId(value), []);
	const options = entityListToSelectOptions(templates);

	const entity = useMemo(() => templates.find(({ id }) => selectedEntityId === id), [selectedEntityId, templates]);

	const onSelectTemplate = useCallback(() => addEntity(entity), [addEntity, entity]);

	const selectExistingID = 'existing-entity';

	const selectExisting = (
		<>
			<Select id={selectExistingID} options={options} onChangeValue={onChangeValue} />
			<Button buttonText={__('Select')} onClick={onSelectTemplate} isDisabled={!selectedEntityId} />
		</>
	);

	return <EntityOptionsRow onAddNew={onAddNew} selectExisting={selectExisting} selectExistingID={selectExistingID} />;
};
