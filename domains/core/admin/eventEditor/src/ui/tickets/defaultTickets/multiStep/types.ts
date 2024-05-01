import type { FormRenderProps } from 'react-final-form';

import type { TicketFormShape } from '@eventespresso/edtr-services';
import type { PrevNext } from '@eventespresso/hooks';
import { DefaultTicket } from '../data';

export type OnSubmit = (fields: Record<string, any>) => void;

export interface ContentRendererProps {
	entity?: DefaultTicket;
	onClose: VoidFunction;
	onSubmit?: OnSubmit;
}

export interface ModalBodyProps {
	steps?: PrevNext;
}

export interface ContextProviderProps extends FormRenderProps<TicketFormShape> {
	isOpen: boolean;
	onClose: VoidFunction;
	onToggle?: VoidFunction;
}
