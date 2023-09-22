import { useMemo, useContext } from 'react';
import { __ } from '@eventespresso/i18n';
import { CollapsibleLegend, ModalWithAlert } from '@eventespresso/ui-components';
import type { ModalWithAlertProps } from '@eventespresso/ui-components';

import { legendConfig } from './config';
import TicketAssignmentsManager from './TicketAssignmentsManager';
import { useDataState } from '../data';
import type { TAMModalProps } from '../context/types';
import useSubmitButtonProps from './useSubmitButtonProps';
import { Context } from '../context/ContextProvider';

import './styles.scss';

const TicketAssignmentsManagerModal: React.FC<Partial<TAMModalProps>> = ({ onCloseModal, onSubmit, title }) => {
	const { hasOrphanEntities, isDirty } = useDataState();
	const hasErrors = hasOrphanEntities();

	const submitButtonProps = useSubmitButtonProps(onSubmit);

	const data = useContext(Context);

	const ariaLabel: string = useMemo(() => {
		if (!data.entity) {
			return '<loading aria label>';
		}
		return `ticket assignment modal for ticket ${data.entity.name}`;
	}, [data]);

	const ariaAttributes: ModalWithAlertProps['ariaAttributes'] = useMemo(
		() => ({ modalContent: { 'aria-label': ariaLabel } }),
		[ariaLabel]
	);

	return (
		<ModalWithAlert
			bodyClassName='ee-ticket-assignments-manager__body'
			className='ee-ticket-assignments-manager'
			isOpen={true}
			isSubmitDisabled={hasErrors}
			onClose={onCloseModal}
			onCancel={onCloseModal}
			submitButtonProps={submitButtonProps}
			showAlertOnClose={isDirty || hasErrors}
			title={title || __('Ticket Assignment Manager')}
			ariaAttributes={ariaAttributes}
		>
			<TicketAssignmentsManager />
			<CollapsibleLegend direction='row' legendConfig={legendConfig} />
		</ModalWithAlert>
	);
};

export default TicketAssignmentsManagerModal;
