import { useMemo } from 'react';
import { is, toString } from 'ramda';

const useMemoStringify = <Data extends any = any, Deps extends any[] = any>(data: Data, deps?: Deps): Data => {
	let dataStringified: string;

	if (deps && Array.isArray(deps)) {
		dataStringified = deps.map(toString).join(':');
	} else if (is(Object, data)) {
		dataStringified = JSON.stringify(data);
	}

	// eslint-disable-next-line react-hooks/exhaustive-deps
	return useMemo(() => data, [dataStringified]);
};

export default useMemoStringify;
