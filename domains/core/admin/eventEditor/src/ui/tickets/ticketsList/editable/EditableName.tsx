import { useCallback } from 'react';

import { __ } from '@eventespresso/i18n';

import type { TicketItemProps } from '../types';
import { useTicketMutator } from '@eventespresso/edtr-services';
import { InlineEditText } from '@eventespresso/ui-components';

interface EditableNameProps extends TicketItemProps {
	'data-testid'?: string;
	className?: string;
	view?: 'card' | 'table';
}

const EditableName: React.FC<Partial<EditableNameProps>> = ({
	className,
	'data-testid': testid,
	entity: ticket,
	view = 'card',
}) => {
	const { updateEntity } = useTicketMutator(ticket.id);

	const lineCount = view === 'card' && 2;

	const onChangeName = useCallback(
		(name: string): void => {
			if (name !== ticket.name) {
				updateEntity({ name });
			}
		},
		[ticket.name, updateEntity]
	);

	return (
		<InlineEditText
			className={className}
			data-testid={testid}
			lineCount={lineCount}
			onChange={onChangeName}
			tag={view === 'table' ? 'div' : 'h4'}
			tooltip={__('click to edit title…')}
			value={ticket.name || __('add title…')}
		/>
	);
};

export default EditableName;
