import { useMemo } from 'react';

import { FormWithConfig } from '@eventespresso/ee-components';

import useTicketFormConfig from '../useTicketFormConfig';
import ContentWrapper from './ContentWrapper';
import type { ContentProps } from './types';

const Content: React.FC<ContentProps> = ({ entityId, onClose, onSubmit }) => {
	const config = useMemo(() => ({ onSubmit }), [onSubmit]);
	const formConfig = useTicketFormConfig(entityId, config);

	return <FormWithConfig {...formConfig} formWrapper={ContentWrapper} onClose={onClose} />;
};

export default Content;
