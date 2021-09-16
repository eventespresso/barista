import type { Reducer, ReducerState } from 'react';

import type { AnyObject } from '@eventespresso/utils';

import type { FormSection, FormElement } from '../types';
import type { FormStateProviderProps } from '../context';

export interface FormState {
	sections: AnyObject<FormSection>;
	elements: AnyObject<FormElement>;
	deletedSections: Array<string>;
	deletedElements: Array<string>;
	topLevelSection: string;
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
	| 'MARK_ELEMENT_AS_SAVED'
	| 'MARK_SECTION_AS_SAVED'
	| 'MARK_ELEMENT_AS_DELETED'
	| 'MARK_SECTION_AS_DELETED'
	| 'MOVE_ELEMENT'
	| 'MOVE_SECTION'
	| 'RESET'
	| 'TOGGLE_OPEN_ELEMENT'
	| 'UPDATE_ELEMENT'
	| 'UPDATE_SECTION';

export interface DataAction extends Partial<FormState> {
	id?: string;
	afterId?: string;
	element?: Partial<FormElement>;
	index?: number;
	section?: Partial<FormSection>;
	sectionId?: string;
	type: ActionType;
}

export type FormStateManagerHook = (props?: FormStateProviderProps) => FormStateManager;

type ArgsData = Required<DataAction>;

export interface FormStateManager
	extends FormState,
		Pick<FormStateProviderProps, 'appliesToOptions' | 'mapsToOptions'> {
	addElement: (args: Pick<ArgsData, 'element'>) => void;
	addSection: (args: Pick<ArgsData, 'section' | 'afterId'>) => void;
	copyElement: (args: Pick<ArgsData, 'id'>) => void;
	copySection: (args: Pick<ArgsData, 'section' | 'id' | 'afterId'>) => void;
	deleteElement: (args: Pick<ArgsData, 'id'>) => void;
	deleteSection: (args: Pick<ArgsData, 'id'>) => void;
	getData: () => FormState;
	getElements: (args: Pick<ArgsData, 'sectionId'>) => Array<FormElement>;
	getSections: () => Array<FormSection>;
	getSharedSections: () => Array<FormSection>;
	isElementOpen: (args: Pick<ArgsData, 'id'>) => boolean;
	isTopLevelSection: (args: Pick<ArgsData, 'id'>) => boolean;
	markElementAsDeleted: (args: Pick<ArgsData, 'id'>) => void;
	markElementAsSaved: (args: Pick<ArgsData, 'id' | 'element'>) => void;
	markSectionAsDeleted: (args: Pick<ArgsData, 'id'>) => void;
	markSectionAsSaved: (args: Pick<ArgsData, 'id' | 'section'>) => void;
	moveElement: (args: Pick<ArgsData, 'index' | 'id' | 'sectionId'>) => void;
	moveSection: (args: Pick<ArgsData, 'index' | 'id'>) => void;
	reset: () => void;
	toggleOpenElement: (args: Pick<ArgsData, 'openElement'>) => void;
	updateElement: (args: Pick<ArgsData, 'id' | 'element'>) => void;
	updateSection: (args: Pick<ArgsData, 'id' | 'section'>) => void;
}

export type FormStateReducer = Reducer<FormState, DataAction>;

export type StateInitializer = (state: FormState) => ReducerState<FormStateReducer>;
