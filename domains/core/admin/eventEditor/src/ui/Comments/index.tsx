import { useEffect } from 'react';
import { moveAfterElement, hideAllExcept } from '../utils';

export const Comments = () => {
	useEffect(() => {
		const submitdiv = document.getElementById('submitdiv');
		moveAfterElement(submitdiv, 'commentsdiv');
		moveAfterElement(submitdiv, 'commentstatusdiv');
		hideAllExcept(['commentsdiv', 'commentstatusdiv']);
	}, []);

	// for now we'll return null until this UI element gets rebuilt in React
	return null;
	// return <div className='ee-comments ee-edtr-section'></div>;
};
