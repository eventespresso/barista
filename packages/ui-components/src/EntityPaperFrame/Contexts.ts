import { createContext } from 'react';

/**
 * There are no official rules or guidelines telling that empty value is an invalid value
 * @link https://stackoverflow.com/a/58058443/4343719
 */

const AriaLabelContext = createContext('');

const AriaDescriptionContext = createContext('');

const Contexts = {
	AriaLabel: AriaLabelContext,
	AriaDescription: AriaDescriptionContext,
};

export default Contexts;
