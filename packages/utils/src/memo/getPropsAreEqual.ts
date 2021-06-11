import { path, Path } from 'ramda';

import { isEqualJson } from '../misc';
import type { AnyObject } from '../types';

export type PropsAreEqual<P extends AnyObject> = (
	prevProps: Readonly<React.PropsWithChildren<P>>,
	nextProps: Readonly<React.PropsWithChildren<P>>
) => boolean;

/**
 * Generates the comparison function that can be used as second argument to React.memo()
 */
export const getPropsAreEqual = <P extends AnyObject>(paths: Array<Path>, compareAsJson = true): PropsAreEqual<P> => {
	const propsAreEqual: PropsAreEqual<P> = (prevProps, nextProps): boolean => {
		for (const pathToValue of paths) {
			const prevValue = path<any>(pathToValue, prevProps);
			const nextValue = path<any>(pathToValue, nextProps);

			if (compareAsJson) {
				if (!isEqualJson(prevValue, nextValue)) {
					return false;
				}
			} else if (prevValue !== nextValue) {
				return false;
			}
		}
		return true;
	};

	return propsAreEqual;
};
