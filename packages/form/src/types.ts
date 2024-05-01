import type React from 'react';
import type { FormRenderProps, FormProps, FieldRenderProps, FieldProps as RFFFieldProps } from 'react-final-form';
import type { FieldArrayProps } from 'react-final-form-arrays';
import type { FormState } from 'final-form';

import type { ButtonProps, FormControlProps, OptionsType } from '@eventespresso/adapters';
import type { IconComponent } from '@eventespresso/icons';
import type { FormConfigProviderProps } from './context';

export interface FormButtonProps extends ButtonProps {
	buttonText?: string;
}

export interface FormConfig {
	locale?: string;
	dateFormat?: string;
	timeFormat?: string;
	dateTimeFormat?: string;
}

interface AdditionalFormProps<FormValues = Record<string, any>> extends FormConfigProviderProps {
	sections?: SectionList<FormValues>;
	fields?: FieldList<FormValues>;
	submitButton?: FormButtonProps;
	resetButton?: FormButtonProps;
	formWrapper?: React.ComponentType<FormRenderProps<FormValues>>;
	debugFields?: Array<keyof FormState<any>>; // The fields from RFF form state to display in debug
}

type FieldType =
	| 'datepicker'
	| 'datetimepicker'
	| 'group'
	| 'hidden'
	| 'multicheck'
	| 'number'
	| 'radio'
	| 'simple-text-editor'
	| 'select'
	| 'switch'
	| 'tag-selector'
	| 'text'
	| 'textarea'
	| 'timepicker'
	| 'wpmedia-image';

export interface FieldWrapperProps extends Omit<FieldRendererProps, 'component'> {
	component: React.ComponentType<Omit<FieldRendererProps, 'fieldType'>>;
}

export interface AdditionalFieldProps<FormValues = Record<string, any>> {
	label?: string | JSX.Element;
	fieldType: FieldType;
	htmlType?: string;
	before?: React.ReactNode | string;
	after?: React.ReactNode | string;
	description?: React.ReactNode | string;
	subFields?: FieldList<FormValues>;
	options?: OptionsType;
	items?: Array<string>; // for tag selector
	isRepeatable?: boolean;
	conditions?: FieldConditions;
	formControlProps?: FormControlProps;
	parseAsInfinity?: boolean;
	wrapper?: React.ComponentType<FieldWrapperProps>;
	[key: string]: any;
}

type Compare =
	| '='
	| '!='
	| '!='
	| '>'
	| '>='
	| '<'
	| '<='
	| 'EMPTY'
	| 'NOT_EMPTY'
	| 'CONTAINS'
	| 'NOT_CONTAINS'
	| 'MATCHES'
	| 'NOT_MATCHES';

export interface FieldCondition {
	field: string;
	compare: Compare;
	value?: any;
}

export type FieldConditions = Array<FieldCondition>;

export interface EspressoFormProps<FormValues = Record<string, any>>
	extends FormProps<FormValues>,
		AdditionalFormProps<FormValues> {
	columns?: 1 | 2;
}

export interface FormRendererProps<FormValues = Record<string, any>>
	extends FormRenderProps<FormValues>,
		AdditionalFormProps<FormValues> {
	columns?: 1 | 2;
}

export interface FieldRendererProps<FieldValue = any>
	extends FieldRenderProps<FieldValue>,
		FieldProps<Record<string, any>, FieldValue> {}

export interface RepeatableRendererProps<FieldValue = any>
	extends FieldArrayProps<FieldValue, any>,
		AdditionalFieldProps<Record<string, any>> {}

export interface FieldProps<FormValues = Record<string, any>, FieldValue = any>
	extends AdditionalFieldProps<FormValues>,
		RFFFieldProps<FieldValue, FieldRendererProps> {
	columns?: 2 | 3 | 4;
	name: string & keyof FormValues;
}

export type FormValuesShape = {
	[key: string]: any;
};

export interface SubmitProps extends Pick<AdditionalFormProps, 'submitButton' | 'resetButton'> {
	submitting: boolean;
}

export interface RenderFieldsProps {
	fields: FieldList;
	inline?: boolean;
	namespace?: string;
}

export interface RenderSectionsProps {
	columns?: 1 | 2;
	sections: SectionList;
}

export interface RenderFieldProps extends FieldProps<Record<string, any>> {}

export interface FormSectionProps<FormValues = Record<string, any>> {
	/**
	 * If true, each field inside the section
	 * will be saved as `${section.name}.{field.name}`
	 */
	addSectionToFieldNames?: boolean;
	columns?: 1 | 2;
	fields: FieldList<FormValues>;
	icon?: IconComponent;
	inline?: boolean;
	name: string;
	title?: React.ReactNode;
}

export type FieldList<FormValues = Record<string, any>> = Array<FieldProps<FormValues>>;

export type SectionList<FormValues = Record<string, any>> = Array<FormSectionProps<FormValues>>;
