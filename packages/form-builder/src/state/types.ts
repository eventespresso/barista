import type { Reducer, ReducerState } from 'react';

import type { AnyObject } from '@eventespresso/utils';

import type { FormSection, FormElement } from '../types';
import type { FormStateProviderProps } from '../context';

export interface FormState {
	sections: AnyObject<FormSection>;
	elements: AnyObject<FormElement>;
	deletedSections: Array<string>;
	deletedElements: Array<string>;
	isDirty: boolean;
	openElement?: string;
}

export type ActionType =
	| 'ADD_ELEMENT'
	| 'ADD_SECTION'
	| 'COPY_ELEMENT'
	| 'COPY_SECTION'
	| 'DELETE_ELEMENT'
	| 'DELETE_SECTION'
	| 'MOVE_ELEMENT'
	| 'MOVE_SECTION'
	| 'TOGGLE_OPEN_ELEMENT'
	| 'UPDATE_ELEMENT'
	| 'UPDATE_SECTION'
	| 'RESET';

export interface DataAction extends Partial<FormState> {
	UUID?: string;
	afterUuid?: string;
	element?: Partial<FormElement>;
	index?: number;
	section?: Partial<FormSection>;
	sectionId?: string;
	type: ActionType;
}

export type FormStateManagerHook = (props?: FormStateProviderProps) => FormStateManager;

export interface FormStateManager extends FormState {
	addElement: (args: Pick<DataAction, 'element'>) => void;
	addSection: (args: Pick<DataAction, 'section' | 'afterUuid'>) => void;
	copyElement: (args: Pick<DataAction, 'UUID'>) => void;
	copySection: (args: Pick<DataAction, 'section' | 'UUID'>) => void;
	deleteElement: (args: Pick<DataAction, 'UUID'>) => void;
	deleteSection: (args: Pick<DataAction, 'UUID'>) => void;
	getData: () => FormState;
	getElements: (args: Pick<DataAction, 'sectionId'>) => Array<FormElement>;
	getSections: () => Array<FormSection>;
	isElementOpen: (args: Pick<DataAction, 'UUID'>) => boolean;
	moveElement: (args: Pick<DataAction, 'index' | 'UUID' | 'sectionId'>) => void;
	moveSection: (args: Pick<DataAction, 'index' | 'UUID'>) => void;
	reset: () => void;
	toggleOpenElement: (args: Pick<DataAction, 'openElement'>) => void;
	updateElement: (args: Pick<DataAction, 'UUID' | 'element'>) => void;
	updateSection: (args: Pick<DataAction, 'UUID' | 'section'>) => void;
}

export type FormStateReducer = Reducer<FormState, DataAction>;

export type StateInitializer = (state: FormState) => ReducerState<FormStateReducer>;
