import type { DraggableProvidedDragHandleProps, OptionsType } from '@eventespresso/adapters';

export type ElementType =
	| 'button'
	| 'checkbox-multi'
	| 'date'
	| 'datetime-local'
	| 'day-select'
	| 'decimal'
	| 'email'
	| 'email-confirmation'
	| 'formSection'
	| 'html'
	| 'integer'
	| 'month'
	| 'month-select'
	| 'password'
	| 'radio'
	| 'range'
	| 'reset'
	| 'select'
	| 'select-country'
	| 'select-multi'
	| 'select-state'
	| 'switch'
	| 'tel'
	| 'text'
	| 'textarea'
	| 'textarea-html'
	| 'time'
	| 'url'
	| 'week'
	| 'year-select';

export type ElementBlock = {
	label: React.ReactNode;
	type: ElementType;
	desc: string;
};

export type LocalOnlyFields = {
	// These are the purity flags which can be used for mutations
	isNew?: boolean;
	isModified?: boolean;
	// This is the current input value if needed.
	value?: any;
};

export interface FormElement extends LocalOnlyFields {
	id: string;
	adminLabel?: string;
	adminOnly?: boolean;
	belongsTo: string;
	customCss?: string;
	helpClass?: string;
	helpText?: string;
	htmlClass?: string;
	mapsTo?: string;
	max?: number;
	min?: number;
	options?: OptionsType;
	order: number;
	placeholder?: string;
	publicLabel?: string;
	required?: boolean;
	requiredText?: string;
	status?: FormSectionStatus;
	type: ElementType;
	wpUser?: number;
}

export type FormSectionStatus = 'ACTIVE' | 'ARCHIVED' | 'DEFAULT' | 'SHARED' | 'TRASHED';
export type FormSectionAppliesTo = 'ALL' | 'PRIMARY' | 'PURCHASER' | 'REGISTRANTS';

export interface FormSection extends LocalOnlyFields {
	adminLabel?: string;
	appliesTo?: FormSectionAppliesTo;
	belongsTo?: string;
	htmlClass?: string;
	id: string;
	order: number;
	publicLabel: string;
	showLabel?: boolean;
	status?: FormSectionStatus;
	wpUser?: number;
}

export interface FormBuilderProps {
	bodyClassName?: string;
	containerClassName?: string;
	contentClassName?: string;
	header?: React.ReactNode;
	sidebarClassName?: string;
}

interface CommonProps {
	index?: number;
}

export interface FieldOptionProps extends CommonProps {
	label: React.ReactNode;
	onChange: (key: 'value' | 'label', index: number) => (value: string) => void;
	onRemove: (index: number) => VoidFunction;
	id: string;
	value: React.ReactText;
}

export interface FormElementProps extends CommonProps {
	element: FormElement;
}

export interface FormElementToolbarProps extends FormElementProps {
	dragHandleProps: DraggableProvidedDragHandleProps;
}

export interface FormSectionProps extends CommonProps {
	formSection: FormSection;
}

export interface FormSectionToolbarProps extends FormSectionProps {
	dragHandleProps: DraggableProvidedDragHandleProps;
}
