import type { FormRenderProps } from 'react-final-form';

import type { DateFormShape } from '@eventespresso/edtr-services';
import type { PrevNext } from '@eventespresso/hooks';
import type { EntityId } from '@eventespresso/data';

export type OnSubmit = (fields: Record<string, any>) => void;

export interface ContentProps {
	entityId: EntityId;
	onClose: VoidFunction;
	onSubmit: OnSubmit;
}

export interface ModalBodyProps {
	steps?: PrevNext;
}

export interface ContentWrapperProps extends FormRenderProps<DateFormShape> {
	onClose: VoidFunction;
}
