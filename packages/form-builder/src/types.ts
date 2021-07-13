import type { DraggableProvidedDragHandleProps, OptionsType } from '@eventespresso/adapters';

export type ElementType =
	| 'BUTTON'
	| 'CHECKBOX_MULTI'
	| 'DATE'
	| 'DATETIME_LOCAL'
	| 'DAY_SELECT'
	| 'DECIMAL'
	| 'EMAIL'
	| 'EMAIL_CONFIRMATION'
	| 'FORM_SECTION'
	| 'HTML'
	| 'INTEGER'
	| 'MONTH'
	| 'MONTH_SELECT'
	| 'PASSWORD'
	| 'PASSWORD_CONFIRMATION'
	| 'RADIO'
	| 'RANGE'
	| 'RESET'
	| 'SELECT'
	| 'SELECT_COUNTRY'
	| 'SELECT_MULTI'
	| 'SELECT_STATE'
	| 'SWITCH'
	| 'TEL'
	| 'TEXT'
	| 'TEXTAREA'
	| 'TEXTAREA_HTML'
	| 'TIME'
	| 'URL'
	| 'WEEK'
	| 'YEAR_SELECT';

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

export type FormStatusFlags = {
	isActive?: boolean;
	isArchived?: boolean;
	isDefault?: boolean;
	isShared?: boolean;
	isTrashed?: boolean;
};

export type FormAttributes = {
	autocomplete?: boolean;
	class?: string;
	format?: string; // for phone numbers
	max?: number;
	maxDate?: Date;
	maxlength?: number;
	min?: number;
	minDate?: Date;
	pattern?: string;
	placeholder?: string;
	size?: number;
	step?: number;
};

export type FormHelpText = {
	helpText?: string;
	htmlClass?: string;
};

export type FormLabel = {
	adminLabel?: string;
	publicLabel?: string;
	showLabel?: boolean;
	html?: string; // this is for HTML elements
};

export type FormRequired = {
	required?: boolean;
	validationText?: string;
};

export interface FormElement extends LocalOnlyFields {
	adminOnly?: boolean;
	attributes?: FormAttributes;
	belongsTo: string;
	helpText?: FormHelpText;
	id: string;
	label?: FormLabel;
	mapsTo?: string;
	options?: OptionsType;
	order: number;
	required?: FormRequired;
	type: ElementType;
	wpUser?: string;
}

export type FormStatus = 'ACTIVE' | 'ARCHIVED' | 'DEFAULT' | 'SHARED' | 'TRASHED';
export type FormSectionAppliesTo = 'ALL' | 'PRIMARY' | 'PURCHASER' | 'REGISTRANTS';

export interface FormSection extends LocalOnlyFields, Required<FormStatusFlags> {
	appliesTo?: FormSectionAppliesTo;
	attributes?: FormAttributes;
	belongsTo?: string;
	id: string;
	label?: FormLabel;
	order: number;
	status?: FormStatus;
	wpUser?: string;
}

export type SectionJsonFields = 'attributes' | 'label';

export type ElementJsonFields = SectionJsonFields | 'helpText' | 'options' | 'required';

export type FormElementRaw = Omit<FormElement, ElementJsonFields> & Partial<Record<ElementJsonFields, string>>;

export type FormSectionRaw = Omit<FormSection, SectionJsonFields> & Partial<Record<SectionJsonFields, string>>;

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
