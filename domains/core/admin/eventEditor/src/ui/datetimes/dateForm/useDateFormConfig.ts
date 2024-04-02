import { useMemo, useCallback } from 'react';
import * as R from 'ramda';

import { CalendarOutlined, ControlOutlined, ProfileOutlined } from '@eventespresso/icons';
import { startAndEndDateFixer, useDatetimeItem, hooks } from '@eventespresso/edtr-services';
import { useUtcISOToSiteDate, useSiteDateToUtcISO } from '@eventespresso/services';
import { PLUS_ONE_MONTH } from '@eventespresso/constants';
import { useMemoStringify } from '@eventespresso/utils';
import { setDefaultTime } from '@eventespresso/dates';
import { EndDateFieldWrapper } from '@eventespresso/ee-components';
import { EntityId } from '@eventespresso/constants';
import { __ } from '@eventespresso/i18n';
import type { Datetime } from '@eventespresso/constants';
import type { DateFormConfig } from '@eventespresso/edtr-services';
import type { EspressoFormProps } from '@eventespresso/form';

import { validate } from './formValidation';

const FIELD_NAMES: Array<keyof Datetime> = ['id', 'name', 'description', 'capacity', 'isTrashed'];

const decorators = [startAndEndDateFixer];

const adjacentFormItemProps = {
	className: 'ee-form-item-pair',
};

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
		async ({ startDate, endDate, ...values }, form, ...restParams) => {
			return await onSubmit(
				{ ...values, startDate: toUtcISO(startDate), endDate: toUtcISO(endDate) },
				form,
				...restParams
			);
		},
		[onSubmit, toUtcISO]
	);

	const initialValues = useMemo(() => {
		return hooks.applyFilters(
			'eventEditor.dateForm.initalValues',
			{
				...R.pick<Partial<Datetime>, keyof Datetime>(FIELD_NAMES, datetime || {}),
				startDate,
				endDate,
			},
			datetime
		);
	}, [datetime, endDate, startDate]);

	const sections = useMemo(() => {
		return hooks.applyFilters(
			'eventEditor.dateForm.sections',
			[
				{
					name: 'basics',
					icon: ProfileOutlined,
					title: __('Basics'),
					fields: [
						{
							fieldType: 'text',
							label: __('Name'),
							name: 'name',
						},
						{
							name: 'description',
							label: __('Description'),
							fieldType: 'simple-text-editor',
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
							formControlProps: adjacentFormItemProps,
						},
						{
							name: 'endDate',
							label: __('End Date'),
							fieldType: 'datetimepicker',
							required: true,
							wrapper: EndDateFieldWrapper,
							formControlProps: adjacentFormItemProps,
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
							info:
								__(
									'The maximum number of registrants that can attend the event at this particular date.'
								) +
								'\n' +
								__('Set to 0 to close registration or leave blank for no limit.'),
							width: 'small',
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
			datetime
		);
	}, [datetime]);

	return useMemo(
		() => ({
			...config,
			onSubmit: onSubmitFrom,
			decorators,
			initialValues,
			subscription: {},
			validate,
			layout: 'horizontal',
			sections,
		}),
		[config, initialValues, onSubmitFrom, sections]
	);
};

export default useDateFormConfig;
