import React, { useCallback } from 'react';
import { __, sprintf } from '@eventespresso/i18n';

import { Button } from '@eventespresso/adapters';
import { CloseOutlined } from '@eventespresso/icons';
import type { RepeatableRendererProps } from '../types';
import { Field, Group } from '../fields';

const RepeatableRenderer: React.FC<Omit<RepeatableRendererProps, 'component'>> = ({
	fields,
	fieldType,
	label,
	...rest
}) => {
	const Component = fieldType === 'group' ? Group : Field;

	const onAdd = useCallback(() => fields.push(undefined), [fields]);
	const onRemove = useCallback((index: number) => () => () => fields.remove(index), [fields]);
	return (
		<>
			<div>
				<h4>{label}</h4>
			</div>
			{fields.map((fieldName: string, index: number) => {
				return (
					<div key={fieldName + index} className='repeatable-item'>
						<Component
							{...rest}
							fieldType={fieldType}
							name={fieldName}
							label={
								<>
									{sprintf(
										/* translators: %d the entry number */
										__('Entry %d'),
										`${index + 1}`
									)}
									<Button
										className='remove-item'
										size='sm'
										icon={CloseOutlined}
										onClick={onRemove(index)}
									/>
								</>
							}
						/>
					</div>
				);
			})}
			<Button className='add-item' onClick={onAdd}>
				{__('Add')}
			</Button>
		</>
	);
};
export default RepeatableRenderer;
