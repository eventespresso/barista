import { forwardRef, useCallback, useEffect, useMemo, useState } from 'react';

import { useDebouncedCallback } from 'use-debounce';

import type { InternalDebounceProps, WithDebounceProps } from './types';
import type { ForwardRefComponent } from '../types';
import { useIfMounted, usePrevious } from '@eventespresso/hooks';
import { AnyObject, noop } from '@eventespresso/utils';

/**
 * HOC to delay calling of `onChangeValue` passed to the `WrappedComponent`
 *
 * @param WrappedComponent The component to debounce the onchange handler for
 * @param valueProp The prop to use for passing the value, e.g. 'isChecked' for Switch/checkbox
 */
const withDebounce = <P extends AnyObject, R extends any>(
	WrappedComponent: React.ComponentType<P>,
	valueProp: keyof P = 'value',
	changeHandler: keyof P = 'onChangeValue'
): ForwardRefComponent<P & WithDebounceProps, R> => {
	type Ref = React.Ref<R>;
	type RefProps = { forwardedRef: Ref } & WithDebounceProps & InternalDebounceProps;

	const WithDebounce: React.FC<P & RefProps> = ({ forwardedRef, debounceDelay, onChangeInstantValue, ...props }) => {
		const onChangeValue = props[changeHandler as string];
		// to use debounce, debounceDelay and onChangeValue should be passed
		const shouldDebounce = debounceDelay && typeof onChangeValue !== 'undefined';

		const fieldValue = props[valueProp as string];

		const [internalValue, setInternalValue] = useState(fieldValue);

		const callback = useDebouncedCallback(onChangeValue || noop, debounceDelay); // delay in MS

		const onChangeHandler = useCallback(
			(newValue, event) => {
				// set the value only if the field is controlled
				if (typeof internalValue !== 'undefined') {
					setInternalValue(newValue);
				}
				onChangeInstantValue?.(newValue);
				callback(newValue, event);
			},
			[callback, internalValue, onChangeInstantValue]
		);

		const previousValue = usePrevious(fieldValue);
		const ifMounted = useIfMounted();
		useEffect(() => {
			// update value if updated from consumer
			ifMounted(() => {
				if (shouldDebounce && fieldValue !== previousValue) {
					setInternalValue(fieldValue);
				}
			});
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [fieldValue]);

		// if not debouncing, pass the external field value directly
		const valueToPass = shouldDebounce ? internalValue : fieldValue;

		const wrappedCompProps: P = useMemo(
			() => ({
				...(props as P),
				[changeHandler]: shouldDebounce ? onChangeHandler : onChangeValue,
				ref: forwardedRef,
				[valueProp]: valueToPass,
			}),
			[forwardedRef, onChangeHandler, onChangeValue, props, shouldDebounce, valueToPass]
		);

		return <WrappedComponent {...wrappedCompProps} />;
	};

	return forwardRef((props: P, ref: Ref) => {
		return <WithDebounce {...props} forwardedRef={ref} />;
	});
};

export default withDebounce;
