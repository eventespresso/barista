import { useMemo, useCallback } from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { pick } from 'ramda';
import { parseISO } from 'date-fns';

import { CalendarOutlined, ControlOutlined, ProfileOutlined } from '@eventespresso/icons';
import { useDatetimeItem, processDateAndTime } from '@eventespresso/edtr-services';
import { PLUS_ONE_MONTH, PLUS_TWO_MONTHS } from '@eventespresso/constants';
import type { EspressoFormProps } from '@eventespresso/form';
import type { Datetime } from '@eventespresso/edtr-services';
import { useTimeZoneTime } from '@eventespresso/services';
import { useMemoStringify } from '@eventespresso/hooks';
import { EntityId } from '@eventespresso/data';

import { validate } from './formValidation';
import { DateFormShape } from './types';

type DateFormConfig = EspressoFormProps<DateFormShape>;

const FIELD_NAMES: Array<keyof Datetime> = ['id', 'name', 'description', 'capacity', 'isTrashed'];

const useDateFormConfig = (id: EntityId, config?: EspressoFormProps): DateFormConfig => {
	const datetime = useDatetimeItem({ id });

	const { siteTimeToUtc, utcToSiteTime } = useTimeZoneTime();

	const startDate = useMemoStringify(
		datetime?.startDate ? utcToSiteTime(parseISO(datetime?.startDate)) : PLUS_ONE_MONTH
	);
	const endDate = useMemoStringify(datetime?.endDate ? utcToSiteTime(parseISO(datetime?.endDate)) : PLUS_TWO_MONTHS);

	const { onSubmit } = config;

	const onSubmitFrom: DateFormConfig['onSubmit'] = useCallback(
		({ dateTime, ...rest }, form, ...restParams) => {
			// convert "dateTime" object to proper UTC "startDate" and "endDate"
			const { startDate, endDate } = processDateAndTime(dateTime, siteTimeToUtc);

			const values = { ...rest, startDate, endDate };

			return onSubmit(values, form, ...restParams);
		},
		[onSubmit, siteTimeToUtc]
	);

	const initialValues: DateFormShape = useMemo(
		() => ({
			...pick<Partial<Datetime>, keyof Datetime>(FIELD_NAMES, datetime || {}),
			dateTime: {
				startDate,
				endDate,
				startTime: startDate,
				endTime: endDate,
			},
		}),
		[datetime, endDate, startDate]
	);

	const adjacentFormItemProps = useMemoStringify({
		className: 'ee-form-item-pair',
	});

	return useMemo(
		() => ({
			...config,
			onSubmit: onSubmitFrom,
			initialValues,
			validate,
			layout: 'horizontal',
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
							fieldType: 'textarea',
						},
					],
				},
				{
					name: 'dateTime',
					icon: CalendarOutlined,
					title: __('Date & Time'),
					fields: [
						{
							name: 'dateTime',
							label: '',
							fieldType: 'group',
							subFields: [
								{
									name: 'startDate',
									label: __('Start Date'),
									fieldType: 'datepicker',
									required: true,
								},
								{
									name: 'startTime',
									label: __('Start Time'),
									fieldType: 'timepicker',
									required: true,
								},
								{
									name: 'endDate',
									label: __('End Date'),
									fieldType: 'datepicker',
									required: true,
								},
								{
									name: 'endTime',
									label: __('End Time'),
									fieldType: 'timepicker',
									required: true,
								},
							],
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
							info: sprintf(
								__(
									'The maximum number of registrants that can attend the event at this particular date.%sSet to 0 to close registration or leave blank for no limit.'
								),
								'\n'
							),
							formControlProps: adjacentFormItemProps,
						},
						{
							name: 'isTrashed',
							label: __('Trash'),
							fieldType: 'switch',
							formControlProps: adjacentFormItemProps,
						},
					],
				},
			],
		}),
		[adjacentFormItemProps, config, initialValues, onSubmitFrom]
	);
};

export default useDateFormConfig;
