import { useRef, useEffect } from 'react';

export default function usePrevious<T>(value: T, initialValue?: T): T {
	const ref = useRef(initialValue);

	useEffect(() => {
		ref.current = value;
	}, [value]);

	return ref.current;
}
