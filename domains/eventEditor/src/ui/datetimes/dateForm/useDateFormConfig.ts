import { useMemo, useCallback } from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { pick } from 'ramda';

import { CalendarOutlined, ControlOutlined, ProfileOutlined } from '@eventespresso/icons';
import { useDatetimeItem } from '@eventespresso/edtr-services';
import { PLUS_ONE_MONTH } from '@eventespresso/constants';
import { setDefaultTime, useUtcISOToSiteDate, useSiteDateToUtcISO } from '@eventespresso/services';
import type { EspressoFormProps } from '@eventespresso/form';
import type { Datetime } from '@eventespresso/edtr-services';
import { useMemoStringify } from '@eventespresso/hooks';
import { EntityId } from '@eventespresso/data';

import { validate } from './formValidation';
import { DateFormShape } from './types';

type DateFormConfig = EspressoFormProps<DateFormShape>;

const FIELD_NAMES: Array<keyof Datetime> = ['id', 'name', 'description', 'capacity', 'isTrashed'];

const useDateFormConfig = (id: EntityId, config?: EspressoFormProps): DateFormConfig => {
	const datetime = useDatetimeItem({ id });

	const toUtcISO = useSiteDateToUtcISO();
	const toSiteDate = useUtcISOToSiteDate();

	const startDate = useMemoStringify(
		datetime?.startDate ? toSiteDate(datetime?.startDate) : setDefaultTime(PLUS_ONE_MONTH, 'start')
	);
	const endDate = useMemoStringify(
		datetime?.endDate ? toSiteDate(datetime?.endDate) : setDefaultTime(PLUS_ONE_MONTH, 'end')
	);

	const { onSubmit } = config;

	const onSubmitFrom: DateFormConfig['onSubmit'] = useCallback(
		({ startDate, endDate, ...values }, form, ...restParams) => {
			return onSubmit(
				{ ...values, startDate: toUtcISO(startDate), endDate: toUtcISO(endDate) },
				form,
				...restParams
			);
		},
		[onSubmit, toUtcISO]
	);

	const initialValues: DateFormShape = useMemo(
		() => ({
			...pick<Partial<Datetime>, keyof Datetime>(FIELD_NAMES, datetime || {}),
			startDate,
			endDate,
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
							fieldType: 'rich-text-editor',
						},
					],
				},
				{
					name: 'dateTime',
					icon: CalendarOutlined,
					title: __('Dates'),
					fields: [
						{
							name: 'startDate',
							label: __('Start Date'),
							fieldType: 'datetimepicker',
							required: true,
						},
						{
							name: 'endDate',
							label: __('End Date'),
							fieldType: 'datetimepicker',
							required: true,
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
