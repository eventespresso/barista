import { createContext } from 'react';

const AriaLabelContext = createContext('');

const AriaDescriptionContext = createContext('');

export default {
	AriaLabel: AriaLabelContext,
	AriaDescription: AriaDescriptionContext,
};
