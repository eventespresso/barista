import { useEffect } from 'react';
import { eventEditor, currentUser, generalSettings } from './data';

import { test } from '@eventespresso/config';

import type { EventEspressoData } from '@eventespresso/config';

const useDomTestData = (): void => {
	// Set the DOM data
	const eventEspressoData: EventEspressoData = {
		...test.mockData,
		eventEditor,
	};
	eventEspressoData.config.currentUser = currentUser;
	eventEspressoData.config.generalSettings = generalSettings;

	window.eventEspressoData = eventEspressoData;

	// For Housekeeping
	useEffect(() => {
		// Make sure to clean up the set data
		// when the context component is unmounted
		// to avoid any unexpected results.
		return (): void => {
			delete window.eventEspressoData;
		};
	}, []);
};
export default useDomTestData;
