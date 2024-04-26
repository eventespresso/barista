import type { FormRenderProps } from 'react-final-form';

import type { TicketFormShape } from '@eventespresso/edtr-services';
import type { PrevNext } from '@eventespresso/hooks';

import type { AnyObject } from '@eventespresso/utils';
import { RemTicket } from '../../../data';

export type OnSubmit = (fields: AnyObject) => void;

export interface ContentRendererProps {
	entity?: RemTicket;
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
