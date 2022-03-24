import { useMemo, useCallback } from 'react';
import * as R from 'ramda';

import { CalendarOutlined, ControlOutlined, ProfileOutlined } from '@eventespresso/icons';
import { useUtcISOToSiteDate, useSiteDateToUtcISO, getEEDomData } from '@eventespresso/services';
import { startAndEndDateFixer, useTicketItem, hooks, useTicketPrices } from '@eventespresso/edtr-services';
import { PLUS_ONE_MONTH, USE_ADVANCED_EDITOR } from '@eventespresso/constants';
import { useMemoStringify } from '@eventespresso/hooks';
import { setDefaultTime } from '@eventespresso/dates';
import { EntityId } from '@eventespresso/data';
import { __ } from '@eventespresso/i18n';
import type { EspressoFormProps, FieldProps, FormSectionProps } from '@eventespresso/form';
import type { Ticket, TicketFormConfig } from '@eventespresso/edtr-services';
import { EndDateFieldWrapper } from '@eventespresso/ee-components';
import { preparePricesForTpc, usePriceToTpcModifier } from '@eventespresso/tpc';
import { useCurrentUserCan } from '@eventespresso/services';

import { validate } from './formValidation';

export const FIELD_NAMES: Array<keyof Ticket> = [
	'id',
	'description',
	'isDefault',
	'isRequired',
	'isTrashed',
	'max',
	'min',
	'name',
	'price',
	'quantity',
	'uses',
	'visibility',
];

const decorators = [startAndEndDateFixer];
const VISIBILITY_OPTIONS = getEEDomData('eventEditor').ticketMeta.visibilityOptions;

const adjacentFormItemProps = {
	className: 'ee-form-item-pair',
};

export const useTicketFormConfig = (id: EntityId, config?: EspressoFormProps): TicketFormConfig => {
	const ticket = useTicketItem({ id });
	const currentUserCan = useCurrentUserCan();

	const toUtcISO = useSiteDateToUtcISO();
	const toSiteDate = useUtcISOToSiteDate();

	const startDate = useMemoStringify(
		ticket?.startDate ? toSiteDate(ticket?.startDate) : setDefaultTime(PLUS_ONE_MONTH, 'start')
	);
	const endDate = useMemoStringify(
		ticket?.endDate ? toSiteDate(ticket?.endDate) : setDefaultTime(PLUS_ONE_MONTH, 'end')
	);

	const { onSubmit } = config;

	const onSubmitFrom: TicketFormConfig['onSubmit'] = useCallback(
		({ startDate, endDate, ...values }, form, ...restParams) => {
			return onSubmit(
				{ ...values, startDate: toUtcISO(startDate), endDate: toUtcISO(endDate) },
				form,
				...restParams
			);
		},
		[onSubmit, toUtcISO]
	);
	const getTicketPrices = useTicketPrices();
	const priceToTpcModifier = usePriceToTpcModifier();

	const initialValues = useMemo(() => {
		const prices = preparePricesForTpc(getTicketPrices(ticket?.id), priceToTpcModifier);

		return hooks.applyFilters(
			'eventEditor.ticketForm.initalValues',
			{
				visibility: 'PUBLIC',
				...R.pick<Omit<Partial<Ticket>, 'prices'>, keyof Ticket>(FIELD_NAMES, ticket || {}),
				// set initial prices
				prices,
				startDate,
				endDate,
			},
			ticket
		);
	}, [endDate, getTicketPrices, priceToTpcModifier, startDate, ticket]);

	const sections = useMemo(() => {
		return hooks.applyFilters(
			'eventEditor.ticketForm.sections',
			[
				{
					name: 'basics',
					icon: ProfileOutlined,
					title: __('Basics'),
					fields: [
						{
							name: 'name',
							label: __('Name'),
							fieldType: 'text',
						},
						{
							name: 'description',
							label: __('Description'),
							fieldType: 'simple-text-editor',
						},
					],
				},
				{
					name: 'sales',
					icon: CalendarOutlined,
					title: __('Ticket Sales'),
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
							name: 'quantity',
							label: __('Quantity For Sale'),
							fieldType: 'number',
							parseAsInfinity: true,
							max: 1000000,
							min: -1,
							info:
								__('The maximum number of this ticket available for sale.') +
								'\n' +
								__('Set to 0 to stop sales, or leave blank for no limit.'),
							width: 'small',
							formControlProps: adjacentFormItemProps,
						},
					],
				},
			],
			ticket
		);
	}, [ticket]);

	const advancedFields: Array<FieldProps> = useMemo(() => {
		return [
			{
				name: 'uses',
				label: __('Number of Uses'),
				fieldType: 'number',
				parseAsInfinity: true,
				max: 1000,
				min: 0,
				info:
					__(
						'Controls the total number of times this ticket can be used, regardless of the number of dates it is assigned to.'
					) +
					'\n' +
					__(
						'Example: A ticket might have access to 4 different dates, but setting this field to 2 would mean that the ticket could only be used twice. Leave blank for no limit.'
					),
				width: 'small',
				formControlProps: adjacentFormItemProps,
			},
			{
				name: 'min',
				label: __('Minimum Quantity'),
				fieldType: 'number',
				max: 1000000,
				min: 0,
				info:
					__(
						'The minimum quantity that can be selected for this ticket. Use this to create ticket bundles or graduated pricing.'
					) +
					'\n' +
					__('Leave blank for no minimum.'),
				width: 'small',
				formControlProps: adjacentFormItemProps,
			},
			{
				name: 'max',
				label: __('Maximum Quantity'),
				fieldType: 'number',
				parseAsInfinity: true,
				max: 1000000,
				min: -1,
				info:
					__(
						'The maximum quantity that can be selected for this ticket. Use this to create ticket bundles or graduated pricing.'
					) +
					'\n' +
					__('Leave blank for no maximum.'),
				width: 'small',
				formControlProps: adjacentFormItemProps,
			},
			{
				name: 'isRequired',
				label: __('Required Ticket'),
				fieldType: 'switch',
				info: __('If enabled, the ticket must be selected and will appear first in frontend ticket lists.'),
				width: 'small',
				formControlProps: adjacentFormItemProps,
			},
			{
				name: 'isTrashed',
				label: __('Trash'),
				fieldType: 'switch',
				formControlProps: adjacentFormItemProps,
			},
			{
				name: 'visibility',
				label: __('Visibility'),
				fieldType: 'select',
				info: __('Where the ticket can be viewed throughout the UI.'),
				options: VISIBILITY_OPTIONS,
			},
		];
	}, []);

	if (currentUserCan(USE_ADVANCED_EDITOR)) {
		const detailsSection: FormSectionProps | undefined = sections.find((section) => section.name === 'details');
		if (typeof detailsSection !== undefined) {
			detailsSection.fields.concat(advancedFields);
		}
	}

	return useMemo(
		() => ({
			...config,
			onSubmit: onSubmitFrom,
			decorators,
			subscription: {},
			initialValues,
			validate,
			debugFields: ['values', 'errors'],
			sections,
		}),
		[config, initialValues, onSubmitFrom, sections]
	);
};

export default useTicketFormConfig;
