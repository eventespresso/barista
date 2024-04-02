import { useEffect } from 'react';
import { eventEditor, currentUser, generalSettings } from './data';

import { mockEspressoDomData } from '@eventespresso/config/src/test/data';
import { EventEspressoData } from '../../../../../types';

const useDomTestData = (): void => {
	// Set the DOM data
	const eventEspressoData: EventEspressoData = {
		...mockEspressoDomData,
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
