import { DataStateManager, useDataState } from '../../../..';

import type { TpcPriceModifier as TPM } from '../../..';

export const useData = <K extends Args.Key>({ price, field }: Args.Type<K>): Args.Hook<K> => {
	const manager = useDataState();

	const onChange: Args.Hook<K>['onChange'] = (event) => {
		const value = event.currentTarget.value;
		manager.updatePrice({ id: price.id, fieldValues: { [field]: value } });
	};

	return {
		onChange,
		value: price[field],
		manager,
	};
};

module Args {
	export type Type<K extends Key> = {
		price: TPM;
		field: K;
	};
	export type Key = keyof TPM;
	export type Value<K extends Key> = TPM[K];
	export type Hook<K extends Key> = {
		onChange: OnChange.Type;
		value: Value<K>;
		manager: DataStateManager;
	};
}

module OnChange {
	export type Type = Input & Select;

	type Input = React.ChangeEventHandler<HTMLInputElement>;
	type Select = React.ChangeEventHandler<HTMLSelectElement>;
}
