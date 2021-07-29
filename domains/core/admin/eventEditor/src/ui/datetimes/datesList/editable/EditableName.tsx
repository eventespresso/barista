import { useCallback } from 'react';

import { __ } from '@eventespresso/i18n';
import { useDatetimeMutator } from '@eventespresso/edtr-services';
import { InlineEditText } from '@eventespresso/ui-components';

import type { DateItemProps } from '../types';

interface EditableNameProps extends DateItemProps {
	'data-testid'?: string;
	className?: string;
	view?: 'card' | 'table';
}

const EditableName: React.FC<EditableNameProps> = ({
	className,
	'data-testid': testid,
	entity: datetime,
	view = 'card',
}) => {
	const { updateEntity } = useDatetimeMutator(datetime.id);

	const lineCount = view === 'card' && 2;

	const onChangeName = useCallback(
		(name: string): void => {
			if (name !== datetime.name) {
				updateEntity({ name });
			}
		},
		[datetime.name, updateEntity]
	);

	return (
		<InlineEditText
			className={className}
			data-testid={testid}
			lineCount={lineCount}
			onChange={onChangeName}
			tag={view === 'table' ? 'div' : 'h4'}
			tooltip={__('click to edit title…')}
			value={datetime.name || __('add title…')}
		/>
	);
};

export default EditableName;
