import { assocPath, dissocPath, pathOr } from 'ramda';

import type { ElementRegistry, UIRegistryInterface as UIRI, UIRegistryOptions, ElementProps } from '.';

/**
 * EP: Element Props: The props of the component that's registerd by the consumer
 * D: Domain name e.g. "eventEditor"
 * S: Name of the service provided by the domain e.g. "entityActions"
 */
class UIRegistry<EP extends ElementProps, D extends string, S extends string> implements UIRI<EP> {
	protected options: UIRegistryOptions<D, S>;

	protected static elementRegistry: ElementRegistry = {};

	private pathToElements: Array<string>;

	private pathToElementsStr: string;

	private registeredElements: Record<string, boolean> = {};

	constructor(options: UIRegistryOptions<D, S>) {
		this.options = options;

		this.pathToElements = [this.options.domain, this.options.service, ...(this.options.path || [])];
		this.pathToElementsStr = this.pathToElements.join(':');
	}

	getRegistrationKey = (elementKey: string, priority: number): string => {
		return `${this.pathToElementsStr}:${elementKey}:${priority}`;
	};

	updateRegisteredElements = (registrationKey: string, action: 'add' | 'remove'): void => {
		this.registeredElements =
			action === 'add'
				? assocPath([registrationKey], true, this.registeredElements)
				: dissocPath([registrationKey], this.registeredElements);
	};

	registerElement: UIRI<EP>['registerElement'] = (key, component, priority = 10) => {
		const registrationKey = this.getRegistrationKey(key, priority);

		if (!(registrationKey in this.registeredElements)) {
			// Add the element to registered elements
			this.updateRegisteredElements(registrationKey, 'add');
			// Add the element(may be JSX) to the registry
			UIRegistry.elementRegistry = assocPath(
				[...this.pathToElements, priority, key],
				component,
				UIRegistry.elementRegistry
			);
		}
	};

	unRegisterElement: UIRI<EP>['unRegisterElement'] = (key, priority = 10) => {
		const registrationKey = this.getRegistrationKey(key, priority);
		if (registrationKey in this.registeredElements) {
			// Remove the element from registered elements
			this.updateRegisteredElements(registrationKey, 'remove');
		}
		// Remove the element from registry
		UIRegistry.elementRegistry = dissocPath([...this.pathToElements, priority, key], UIRegistry.elementRegistry);
	};

	/**
	 * Returns the list of registered UI elements.
	 */
	getElements: UIRI<EP>['getElements'] = () => {
		/**
		 * This list is of this shape:
		 * [
		 *     9: {
		 *         datetimesToShow: () => null,
		 *     },
		 *     10: {
		 *         sortBy: () => null,
		 *     },
		 * ]
		 */
		const elementsWithPriority = pathOr([], this.pathToElements, UIRegistry.elementRegistry);
		return Object.assign({}, ...elementsWithPriority);
	};

	generateElements: UIRI<EP>['generateElements'] = (props) => {
		const elements = Object.entries<React.ComponentType<any>>(this.getElements());

		const total = elements.length;

		return elements.map(([itemKey, Component], i) => <Component key={itemKey + i} totalCount={total} {...props} />);
	};
}

export default UIRegistry;
