import type { Datetime } from '@eventespresso/constants';
import type { PrevNext } from '@eventespresso/hooks';

export interface ExtraContextProps {
	onCloseModal?: VoidFunction;
}

export interface DatetimeProviderProps {
	datetime: Datetime;
}

export interface ProviderProps extends ExtraContextProps {
	datetime: Datetime;
}

export interface ContextProps extends ExtraContextProps {
	datetime: Datetime;
	stepState: PrevNext;
}

export type StepsState = PrevNext;

export interface WithContextProps extends ExtraContextProps {
	datetime: Datetime;
}
