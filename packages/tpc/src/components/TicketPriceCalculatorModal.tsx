import { __, sprintf } from '@eventespresso/i18n';

import TicketPriceCalculator from './TicketPriceCalculator';
import useResetButtonProps from '../buttons/useResetButtonProps';
import useSubmitButtonProps from '../buttons/useSubmitButtonProps';
import { ModalWithAlert } from '@eventespresso/ui-components';

import { useTPCContext } from '../context';
import { useDataState } from '../data';
import { TPCModalProps } from '../types';

import './styles.scss';

const TicketPriceCalculatorModal: React.FC<TPCModalProps> = ({ onSubmit }) => {
	const { onClose } = useTPCContext();
	const { isDirty, ticket } = useDataState();
	const resetButtonProps = useResetButtonProps();
	const submitButtonProps = useSubmitButtonProps(onSubmit);

	return (
		<ModalWithAlert
			alertText={__('Changes will be lost if you proceed.')}
			bodyClassName='ee-tpc__body'
			cancelButtonProps={resetButtonProps}
			className='ee-tpc'
			isOpen={true}
			onClose={onClose}
			// show alert only if dirty
			showAlertOnClose={isDirty}
			submitButtonProps={submitButtonProps}
			title={sprintf(
				/* translators: %s ticket name */
				__('Price Calculator for Ticket: %s'),
				ticket.name
			)}
		>
			<TicketPriceCalculator />
		</ModalWithAlert>
	);
};

export default TicketPriceCalculatorModal;
