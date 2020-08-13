import React from 'react';

import { withContext as withTPCContext } from '@eventespresso/tpc';
import { useBulkEdit } from '@eventespresso/services';

import { EditPricesBaseProps } from '../types';
import { TPCInstance } from './TPCInstance';
import { FooterButtons } from '../buttons';
import { useManageTPCStates } from './useManageTPCStates';
import useOnSubmit from './useOnSubmit';

const EditSeparately: React.FC<EditPricesBaseProps> = ({ onClose }) => {
	const { getSelected } = useBulkEdit();

	const { getDataStates, setTPCState } = useManageTPCStates();

	const onSubmit = useOnSubmit(onClose, getDataStates);

	return (
		<>
			{getSelected().map<React.ReactNode>((ticketId) => {
				const Instance = withTPCContext(TPCInstance, { ticketId });
				return <Instance key={ticketId} setTPCState={setTPCState} />;
			})}
			<FooterButtons onSubmit={onSubmit} onCancel={onClose} />
		</>
	);
};

export default EditSeparately;
