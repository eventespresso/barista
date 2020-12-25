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
	const { ticket } = useDataState();
	const resetButtonProps = useResetButtonProps();
	const submitButtonProps = useSubmitButtonProps(onSubmit);

	return (
		<ModalWithAlert
			isOpen={true}
			onClose={onClose}
			className='ee-tpc'
			bodyClassName='ee-tpc__body'
			submitButtonProps={submitButtonProps}
			cancelButtonProps={resetButtonProps}
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
