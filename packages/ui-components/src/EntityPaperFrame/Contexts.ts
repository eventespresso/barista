import { createContext } from 'react';

const AriaLabelContext = createContext(null);

const AriaDescriptionContext = createContext(null);

const Contexts = {
	AriaLabel: AriaLabelContext,
	AriaDescription: AriaDescriptionContext,
};

export default Contexts;
