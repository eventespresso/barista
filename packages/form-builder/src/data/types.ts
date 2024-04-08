import type { EntityId } from '@eventespresso/constants';
import type { FormSection, FormElement } from '../types';

export interface FormSectionBaseInput extends Omit<FormSection, 'id'> {
	id?: EntityId;
}

export type CreateFormSectionInput = FormSectionBaseInput;

export type UpdateFormSectionInput = FormSectionBaseInput;

export interface DeleteFormSectionInput {
	id?: EntityId;
}

export type FormSectionMutationResult = {
	espressoFormSection: FormSection;
};

export type CreateFormSectionResult = {
	createEspressoFormSection: FormSectionMutationResult;
};

export type UpdateFormSectionResult = {
	updateEspressoFormSection: FormSectionMutationResult;
};

export type DeleteFormSectionResult = {
	deleteEspressoFormSection: FormSectionMutationResult;
};

export interface FormElementBaseInput extends Omit<FormElement, 'id'> {
	id?: EntityId;
}

export type CreateFormElementInput = FormElementBaseInput;

export type UpdateFormElementInput = FormElementBaseInput;

export interface DeleteFormElementInput {
	id?: EntityId;
}

export type FormElementMutationResult = {
	espressoFormElement: FormElement;
};

export type CreateFormElementResult = {
	createEspressoFormElement: FormElementMutationResult;
};

export type UpdateFormElementResult = {
	updateEspressoFormElement: FormElementMutationResult;
};

export type DeleteFormElementResult = {
	deleteEspressoFormElement: FormElementMutationResult;
};
