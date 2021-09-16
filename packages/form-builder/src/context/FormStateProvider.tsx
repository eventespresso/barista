import { createContext } from 'react';

import type { OptionsType } from '@eventespresso/adapters';

import { FormState, FormStateManager, useFormStateManager } from '../state';
import { FormSectionRaw, FormElementRaw } from '../types';

const FormStateContext = createContext<FormStateManager>(null);

const { Provider, Consumer: FormStateConsumer } = FormStateContext;

export interface FormStateProviderProps {
	appliesToOptions?: OptionsType;
	initialElements?: Array<FormElementRaw>;
	initialSections?: Array<FormSectionRaw>;
	mapsToOptions?: OptionsType;
	topLevelSectionId?: string;
	onChange?: (data: FormState) => void;
}

const FormStateProvider: React.FC<FormStateProviderProps> = ({ children, ...props }) => {
	const data = useFormStateManager(props);

	return <Provider value={data}>{children}</Provider>;
};

export { FormStateContext, FormStateProvider, FormStateConsumer };
