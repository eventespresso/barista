import { createContext } from 'react';

const AriaLabelContext = createContext('');

const AriaDescriptionContext = createContext('');

const Contexts = {
	AriaLabel: AriaLabelContext,
	AriaDescription: AriaDescriptionContext,
};

export default Contexts;
