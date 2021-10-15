import * as R from 'ramda';
import { __ } from '@eventespresso/i18n';

import { intervalsToOptions, DATE_INTERVALS, setTimeToNoon } from '@eventespresso/dates';
import { Calendar, ControlOutlined, ProfileOutlined } from '@eventespresso/icons';
import { NOW } from '@eventespresso/constants';
import type { EspressoFormProps } from '@eventespresso/form';
import type { Datetime } from '@eventespresso/edtr-services';
import { validate } from './formValidation';
import { DateFormShape } from './types';
import { DATE_FIELDS_TO_USE } from '../../constants';
import { useMemo } from 'react';

type DateFormConfig = EspressoFormProps<DateFormShape>;

// required for RFF, but we don't need it.
const onSubmit = () => null;

const DATE_DEFAULTS: DateFormShape = {
	startTime: setTimeToNoon(NOW),
	unit: 'days',
	duration: 1,
};

const adjacentFormItemProps = {
	className: 'ee-form-item-pair',
};

const useDateFormConfig = (datetime: Partial<Datetime>, config?: Partial<EspressoFormProps>): DateFormConfig => {
	const initialValues: DateFormShape = useMemo(
		() => ({
			...DATE_DEFAULTS,
			...config?.initialValues,
			...R.pick<Partial<Datetime>, keyof Datetime>(DATE_FIELDS_TO_USE, datetime || {}),
		}),
		[config?.initialValues, datetime]
	);

	return useMemo(
		() => ({
			...config,
			onSubmit,
			initialValues,
			subscription: {},
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
							fieldType: 'simple-text-editor',
						},
					],
				},
				{
					name: 'time',
					icon: Calendar,
					title: __('Time'),
					fields: [
						{
							name: 'startTime',
							label: __('Start Time'),
							fieldType: 'timepicker',
						},
					],
				},
				{
					name: 'length',
					icon: ProfileOutlined,
					inline: true,
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
							options: intervalsToOptions(R.pick(['days', 'hours', 'minutes'], DATE_INTERVALS)),
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
