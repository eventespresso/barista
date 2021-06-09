export const postContainers: Array<string> = [
	'commentsdiv',
	'commentstatusdiv',
	'espresso_event_categoriesdiv',
	'espresso_events_Messages_Hooks_Extend_messages_metabox_metabox',
	'espresso_events_Registration_Form_Hooks_Extend_primary_questions_metabox',
	'espresso_events_Registration_Form_Hooks_Extend_additional_questions_metabox',
	'espresso_events_Venues_Hooks_venue_metabox_metabox', //
	'page_templates',
	'postcustom',
	'postdivrich',
	'postexcerpt',
	'postimagediv',
	'slugdiv',
	'tagsdiv-post_tag',
	'titlediv',
];

export const moveAfter = (targetID: string, divID: string): void => {
	const target = document.getElementById(targetID);
	const divToMove = document.getElementById(divID);
	target.after(divToMove);
};

export const moveInto = (target: Element, divID: string): void => {
	const divToMove = document.getElementById(divID);
	target.append(divToMove);
};

export const moveAfterElement = (target: Element, divID: string): void => {
	const divToMove = document.getElementById(divID);
	target.after(divToMove);
};

export const moveBefore = (targetID: string, divID: string): void => {
	const target = document.getElementById(targetID);
	const divToMove = document.getElementById(divID);
	target.before(divToMove);
};

export const moveBeforeElement = (target: Element, divID: string): void => {
	const divToMove = document.getElementById(divID);
	target.before(divToMove);
};

export const hideAllExcept = (divsToKeep: Array<string>) => {
	divsToKeep.push('submitdiv');
	const elementsToHide: Array<HTMLElement> = [];
	postContainers.forEach((divID) => {
		elementsToHide.push(document.getElementById(divID));
	});
	const postboxes = document.getElementsByClassName('postbox');
	[].forEach.call(postboxes, (postbox: HTMLElement) => {
		elementsToHide.push(postbox);
	});
	elementsToHide.forEach((element: HTMLElement) => {
		// eslint-disable-next-line no-param-reassign
		element.style.display = divsToKeep.includes(element.id) ? 'block' : 'none';
	});
	// make sure to display normal-sortables
	showSortables();
};

export const showSortables = () => {
	// WP was adding an "empty-container" css class to containers AFTER shuffling them around,
	// so had to add this nonsense to make their contents appear again
	setTimeout(() => {
		const normalSortables = document.querySelector('#normal-sortables');
		normalSortables.classList.remove('empty-container');
	}, 250);
};
