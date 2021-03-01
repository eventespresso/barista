import { useMemo } from 'react';

import { __ } from '@eventespresso/i18n';
import type { AnyObject } from '@eventespresso/utils';
import type { EspressoFormProps } from '@eventespresso/form';
import { useUpsellAd } from '../../services';

type UpsellFormConfig = EspressoFormProps<AnyObject>;

const onSubmit = console.log;

const useUpsellFormConfig = (config?: Partial<EspressoFormProps>): UpsellFormConfig => {
	const upsell = useUpsellAd();

	return useMemo(
		() => ({
			...config,
			initialValues: upsell,
			onSubmit,
			subscription: {},
			validate: null,
			debugFields: ['values', 'errors'],
			sections: [
				{
					name: 'basics',
					title: __('Basics'),
					fields: [
						{
							name: 'mainTitle',
							label: __('Main title'),
							fieldType: 'text',
						},
						{
							name: 'subTitle',
							label: __('Subtitle'),
							fieldType: 'text',
						},
						{
							name: 'mainText',
							label: __('Main text'),
							fieldType: 'text',
						},
						{
							name: 'CTA',
							label: __('CTA'),
							fieldType: 'text',
						},
						{
							name: 'CTALink',
							label: __('CTA link'),
							fieldType: 'text',
						},
						{
							name: 'CTAStyle',
							label: __('CTA style'),
							fieldType: 'select',
						},
						{
							name: 'altCTAText',
							label: __('Alternative CTA text'),
							fieldType: 'text',
						},
						{
							name: 'altCTALink',
							label: __('Alternative CTA link'),
							fieldType: 'text',
						},
						{
							name: 'altCTAStyle',
							label: __('Alternative CTA style'),
							fieldType: 'select',
						},
						{
							name: 'isDismissable',
							label: __('Dismissable'),
							fieldType: 'switch',
						},
					],
				},
				{
					name: 'layout-ui',
					title: __('Layout/ UI'),
					fields: [
						{
							name: 'theme',
							label: __('Theme'),
							fieldType: 'select',
						},
						{
							name: 'template',
							label: __('Template'),
							fieldType: 'select',
						},
						{
							name: 'orientation',
							label: __('Orientation'),
							fieldType: 'select',
							required: true,
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
							fieldType: 'text',
						},
					],
				},
			],
		}),
		[config, upsell]
	);
};

export default useUpsellFormConfig;
