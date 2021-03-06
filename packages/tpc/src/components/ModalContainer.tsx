import { useMemo, useCallback } from 'react';

import { useGlobalModal } from '@eventespresso/registry';
import { wait } from '@eventespresso/utils';
import { EdtrGlobalModals } from '@eventespresso/edtr-services';

import TicketPriceCalculatorModal from './TicketPriceCalculatorModal';
import { withContext } from '../context';
import type { BaseProps, TPCModalProps } from '../types';
import { useOnSubmitPrices } from '../hooks';

const ModalContainer: React.FC = () => {
	const { getData, isOpen, close: onClose } = useGlobalModal<BaseProps>(EdtrGlobalModals.TPC);
	const { ticketId } = getData();

	const submitPrices = useOnSubmitPrices();
	const onSubmit = useCallback<TPCModalProps['onSubmit']>(
		async (data) => {
			// wait the next event cycle to fire up isLoading for submit button
			await wait();
			// close TPC modal
			onClose();
			// submit form
			await submitPrices(data);
		},
		[submitPrices, onClose]
	);

	const contextProps = useMemo(() => ({ ticketId, onClose }), [onClose, ticketId]);
	if (!isOpen) {
		return null;
	}
	const Component = withContext(TicketPriceCalculatorModal, contextProps);
	return <Component onSubmit={onSubmit} />;
};

export default ModalContainer;
