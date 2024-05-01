import { useCallback, useMemo } from 'react';

import { sprintf, __ } from '@eventespresso/i18n';
import type { EspressoFormProps, FieldProps } from '@eventespresso/form';

import { useUpsellAd, useUpsellAdMutator, useDomData } from '../../services';
import { containerClassOptions, eventEditorLocationOptions, templates } from './constants';

type UpsellFormConfig = EspressoFormProps<Record<string, any>>;

const nonEdtrFieldConditions: FieldProps['conditions'] = [
	{
		field: 'isForEventEditor',
		compare: '!=',
		value: true,
	},
];

const useUpsellFormConfig = (config?: Partial<EspressoFormProps>): UpsellFormConfig => {
	const upsell = useUpsellAd();
	const { updateEntity } = useUpsellAdMutator();

	const onSubmit = useCallback(
		async (values) => {
			await updateEntity(values);
		},
		[updateEntity]
	);
	const { capabilities } = useDomData();

	return useMemo<UpsellFormConfig>(
		() => ({
			...config,
			initialValues: upsell,
			onSubmit,
			subscription: {},
			validate: null,
			sections: [
				{
					name: 'basics',
					title: __('Basics'),
					fields: [
						{
							name: 'mainTitle',
							label: __('Main title'),
							fieldType: 'text',
							inline: true,
						},
						{
							name: 'subTitle',
							label: __('Subtitle'),
							fieldType: 'text',
							inline: true,
						},
						{
							name: 'mainText',
							label: __('Main text'),
							fieldType: 'text',
							inline: true,
						},
						{
							name: 'cTA',
							label: __('CTA'),
							fieldType: 'text',
							inline: true,
						},
						{
							name: 'cTALink',
							label: __('CTA link'),
							fieldType: 'text',
							inline: true,
						},
						{
							name: 'cTAStyle',
							label: __('CTA style'),
							fieldType: 'select',
							inline: true,
						},
						{
							name: 'altCTAText',
							label: __('Alternative CTA text'),
							fieldType: 'text',
							inline: true,
						},
						{
							name: 'altCTALink',
							label: __('Alternative CTA link'),
							fieldType: 'text',
							inline: true,
						},
						{
							name: 'altCTAStyle',
							label: __('Alternative CTA style'),
							fieldType: 'select',
							inline: true,
						},
					],
				},
				{
					name: 'layout-ui',
					title: __('Layout/ UI'),
					fields: [
						{
							name: 'templateId',
							label: __('Template'),
							fieldType: 'select',
							inline: true,
							options: templates,
						},
						{
							name: 'orientation',
							label: __('Orientation'),
							fieldType: 'select',
							required: true,
							inline: true,
							options: [
								{ label: 'horizontal', value: 'horizontal' },
								{ label: 'vertical', value: 'vertical' },
							],
						},
					],
				},
				{
					name: 'media',
					title: __('Media'),
					fields: [
						{
							name: 'image',
							label: __('Image'),
							fieldType: 'wpmedia-image',
							displayAsInput: true,
						},
					],
				},
				{
					name: 'conditions',
					title: __('Conditions'),
					fields: [
						{
							name: 'isDismissable',
							label: __('Dismissable'),
							fieldType: 'switch',
							inline: true,
						},
						{
							name: 'containerClass',
							label: __('Container Style'),
							fieldType: 'select',
							options: containerClassOptions,
						},
						{
							name: 'excludedCaps',
							label: __('Exclude for Capabilities'),
							fieldType: 'tag-selector',
							description: __(
								'If the user has any of the given capabilities then the notification will not be shown.'
							),
							items: capabilities,
						},
						{
							name: 'showForCaps',
							label: __('Show for Capabilities'),
							fieldType: 'tag-selector',
							description: __(
								'If the user has any of the given capabilities then the notification will be shown.'
							),
							items: capabilities,
						},
						{
							name: 'isForEventEditor',
							label: __('Is for event editor'),
							fieldType: 'switch',
							description: __('Whether the upsell is to be displayed in the event editor.'),
						},
						{
							name: 'location',
							label: __('Location'),
							fieldType: 'select',
							conditions: [
								{
									field: 'isForEventEditor',
									compare: '=',
									value: true,
								},
							],
							options: eventEditorLocationOptions,
						},
						{
							name: 'pagenow',
							label: __('Non EE Page(s)'),
							fieldType: 'textarea',
							conditions: nonEdtrFieldConditions,
							description: sprintf(
								/* translators: 1 variable, 2 & 3 file extensions */
								__(
									'This will correspond with the global %1$s for the WP admin page. In most cases, this is the part that ends with %2$s in the url. For instance the media route would be %3$s. If a given string(s) is not a value for this field in the global $pagenow value then the notification will NOT show.'
								),
								'$pagenow',
								'.php',
								'upload.php'
							),
						},
						{
							name: 'postType',
							label: __('Post Type'),
							fieldType: 'textarea',
							conditions: nonEdtrFieldConditions,
							description: sprintf(
								/* translators: 1 param name */
								__('This will correspond with the %1$s request parameter in the url.'),
								'post_type'
							),
						},
						{
							name: 'page',
							label: __('Page(s)'),
							fieldType: 'textarea',
							conditions: nonEdtrFieldConditions,
							description: sprintf(
								/* translators: 1 param name */
								__(
									'This will correspond with the %1$s request parameter in the url. If a given string(s) is not a value for %1$s in the current url then the notification will NOT show.'
								),
								'page'
							),
						},
						{
							name: 'route',
							label: __('Route(s)'),
							fieldType: 'textarea',
							conditions: nonEdtrFieldConditions,
							description: sprintf(
								/* translators: 1, 2 param names */
								__(
									'This will correspond with the %1$s or %2$s parameter in the url. If a given string(s) is not a value for %1$s or %2$s in the current url then the notification will NOT show.'
								),
								'action',
								'route'
							),
						},
						{
							name: 'actionHook',
							label: __('Action Hook(s)'),
							fieldType: 'textarea',
							conditions: nonEdtrFieldConditions,
							description: sprintf(
								/* translators: 1 hook name */
								__(
									'If this is left blank, then by default the notification will be hooked into the %1$s action.'
								),
								'admin_notices'
							),
						},
					],
				},
			],
		}),
		[capabilities, config, onSubmit, upsell]
	);
};

export default useUpsellFormConfig;
