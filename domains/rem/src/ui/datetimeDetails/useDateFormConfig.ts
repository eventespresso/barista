import { pick } from 'ramda';
import { __ } from '@eventespresso/i18n';

import { intervalsToOptions, DATE_INTERVALS } from '@eventespresso/dates';
import { ControlOutlined, ProfileOutlined } from '@eventespresso/icons';
import type { EspressoFormProps } from '@eventespresso/form';
import { Datetime } from '@eventespresso/edtr-services';
import { validate } from './formValidation';
import { DateFormShape } from './types';
import { DATE_FIELDS_TO_USE } from '../../constants';
import { useMemo } from 'react';

type DateFormConfig = EspressoFormProps<DateFormShape>;

// required for RFF, but we don't need it.
const onSubmit = () => null;

const DATE_DEFAULTS: DateFormShape = {
	unit: 'days',
	duration: 1,
};

const adjacentFormItemProps = {
	className: 'ee-form-item-pair',
};

const useDateFormConfig = (datetime: Datetime, config?: Partial<EspressoFormProps>): DateFormConfig => {
	const initialValues: DateFormShape = useMemo(
		() => ({
			...DATE_DEFAULTS,
			...config?.initialValues,
			...pick<Partial<Datetime>, keyof Datetime>(DATE_FIELDS_TO_USE, datetime || {}),
		}),
		[config?.initialValues, datetime]
	);

	return useMemo(
		() => ({
			...config,
			onSubmit,
			initialValues,
			validate,
			debugFields: ['values', 'errors'],
			sections: [
				{
					name: 'basics',
					icon: ProfileOutlined,
					title: __('Basics'),
					fields: [
						{
							name: 'name',
							label: __('Name'),
							fieldType: 'text',
							required: true,
							min: 3,
						},
						{
							name: 'description',
							label: __('Description'),
							fieldType: 'rich-text-editor',
						},
					],
				},
				{
					name: 'length',
					icon: ProfileOutlined,
					title: __('Length'),
					fields: [
						{
							name: 'duration',
							label: __('Duration'),
							fieldType: 'number',
							max: 1000,
							min: 1,
						},
						{
							name: 'unit',
							label: __('Unit'),
							fieldType: 'select',
							options: intervalsToOptions(pick(['days', 'hours', 'minutes'], DATE_INTERVALS)),
						},
					],
				},
				{
					name: 'details',
					icon: ControlOutlined,
					title: __('Details'),
					fields: [
						{
							name: 'capacity',
							label: __('Capacity'),
							fieldType: 'number',
							parseAsInfinity: true,
							min: -1,
							formControlProps: adjacentFormItemProps,
						},
					],
				},
			],
		}),
		[config, initialValues]
	);
};

export default useDateFormConfig;
