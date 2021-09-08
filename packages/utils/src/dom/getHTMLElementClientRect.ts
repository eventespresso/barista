const getHTMLElementClientRect = (element: HTMLElement): DOMRect => {
	if (!element) {
		return {
			bottom: 0,
			height: 0,
			left: 0,
			right: 0,
			top: 0,
			width: 0,
			x: 0,
			y: 0,
			toJSON: null,
		};
	}
	return element.getBoundingClientRect();
};

export default getHTMLElementClientRect;
