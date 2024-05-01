import { useCallback, useState, useEffect, useMemo } from 'react';
import { sum } from 'ramda';

export interface Progress<T extends Record<string, any>> {
	incrementProgress: (forItem: keyof T) => VoidFunction;
	totalProgress: number;
	updateProgress: (forItem: keyof T, value?: number) => any;
}

export type UseProgress = <T extends Record<string, any>>(totalItems: number, initialProgress?: T) => Progress<T>;

const DEFAULT_INITIAL_PROGRESS = {};

/**
 * A custom hook to maintain the progress of the items.
 *
 * @param totalItems The number of total items to measure the progress for.
 * @param initialProgress An object with the keys being the items for which the progress is
 * to be measured and the value being the number of items to measure the progress for.
 *
 * @returns {number} The total progress percentage.
 *
 * @example
 * totalItems = 56
 * initialProgress = {
 *     datetimes: 0,
 *     tickets: 0,
 * }
 * const { updateProgress, incrementProgress } = useProgress(totalItems, initialProgress);
 * // To update the progress for an item (e.g. datetimes), you can use
 * updateProgress('datetimes', 1);
 *
 * // curried version
 * const incrementDateProgress = incrementProgress('datetimes');
 * // 3 times
 * incrementDateProgress();
 * incrementDateProgress();
 * incrementDateProgress();
 */
export const useProgress: UseProgress = (totalItems, initialProgress) => {
	const [currentProgress, setCurrentProgress] = useState(initialProgress || DEFAULT_INITIAL_PROGRESS);
	const [totalProgress, setTotalProgress] = useState(0);

	// updates progress for a given item type
	const updateProgress = useCallback((forItem, value = 1) => {
		setCurrentProgress((prevProgress) => {
			// add the value to existing progress for the given item
			const updatedProgress = prevProgress[forItem] + value;
			return { ...prevProgress, [forItem]: updatedProgress };
		});
	}, []);

	const incrementProgress = useCallback(
		(forItem) => () => {
			updateProgress(forItem);
		},
		[updateProgress]
	);

	const calculateTotalProgress = useCallback(() => {
		if (totalItems) {
			const newCurrentProgress = sum(Object.values(currentProgress));
			const newTotalProgress = (newCurrentProgress / totalItems) * 100;
			setTotalProgress(newTotalProgress);
		}
	}, [currentProgress, totalItems]);

	useEffect(() => {
		calculateTotalProgress();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentProgress]);

	return useMemo(
		() => ({
			incrementProgress,
			totalProgress,
			updateProgress,
		}),
		[incrementProgress, totalProgress, updateProgress]
	);
};
