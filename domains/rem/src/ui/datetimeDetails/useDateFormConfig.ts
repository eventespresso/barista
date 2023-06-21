import { __ } from '@eventespresso/i18n';
import * as R from 'ramda';
import { useMemo } from 'react';

import { Calendar, ControlOutlined, ProfileOutlined } from '@eventespresso/icons';
import { DATE_FIELDS_TO_USE } from '../../constants';
import { DATE_INTERVALS, intervalsToOptions, setTimeToNoon } from '@eventespresso/dates';
import { DateFormShape } from './types';
import { entityListToSelectOptions } from '@eventespresso/utils';
import { NOW } from '@eventespresso/constants';
import { useVenues } from '@eventespresso/edtr-services';
import { validate } from './formValidation';

import type { EspressoFormProps } from '@eventespresso/form';
import type { Datetime } from '@eventespresso/edtr-services';
import type { OptionsType } from '@eventespresso/adapters';

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

	const venues = useVenues();

	const defaultVenue: OptionsType[0] = {
		label: 'assign venue…',
		value: null,
	};
	const venuesAsOptions = entityListToSelectOptions(venues, defaultVenue);

	return useMemo(
		// for field props see
		//   - packages/form/src/types.ts
		// for form props see
		//   - packages/form/src/types.ts
		//   - react-final-form/typescript/index.d.ts
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
							name: 'venue',
							label: __('Venue'),
							fieldType: 'select',
							options: venuesAsOptions,
						},
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
		[config, initialValues, venuesAsOptions]
	);
};

export default useDateFormConfig;
