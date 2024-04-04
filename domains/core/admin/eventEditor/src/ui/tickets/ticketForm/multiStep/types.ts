import type { FormRenderProps } from 'react-final-form';

import type { TicketFormShape } from '@eventespresso/edtr-services';
import type { PrevNext } from '@eventespresso/hooks';
import type { EntityId } from '@eventespresso/constants';
import type { AnyObject } from '@eventespresso/utils';

export type OnSubmit = (fields: AnyObject) => Promise<any>;

export interface ContentProps {
	entityId: EntityId;
	onClose: VoidFunction;
	onSubmit: OnSubmit;
}

export interface ModalBodyProps {
	steps?: PrevNext;
}

export interface ContentWrapperProps extends FormRenderProps<TicketFormShape> {
	onClose: VoidFunction;
}
