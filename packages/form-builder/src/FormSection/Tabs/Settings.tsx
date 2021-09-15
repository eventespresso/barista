import { __ } from '@eventespresso/i18n';
import { TextInputWithLabel, SwitchWithLabel, SelectWithLabel } from '@eventespresso/ui-components';

import { useUpdateSection } from '../useUpdateSection';

import type { FormSectionProps } from '../../types';

const APPLIES_TO_OPTIONS = [
	{
		value: 'ALL',
		label: __('all'),
	},
	{
		value: 'PRIMARY',
		label: __('primary registrant'),
	},
	{
		value: 'PURCHASER',
		label: __('purchaser'),
	},
	{
		value: 'REGISTRANTS',
		label: __('registrants'),
	},
];

export const Settings: React.FC<FormSectionProps> = ({ formSection }) => {
	const onChangeValue = useUpdateSection(formSection);

	return (
		<>
			<TextInputWithLabel
				label={__('public label')}
				onChangeValue={onChangeValue('label.publicLabel')}
				value={formSection.label?.publicLabel}
			/>
			<TextInputWithLabel
				label={__('admin label')}
				onChangeValue={onChangeValue('label.adminLabel')}
				value={formSection.label?.adminLabel}
			/>
			<SwitchWithLabel
				label={__('show label')}
				onChangeValue={onChangeValue('label.showLabel')}
				isChecked={formSection.label?.showLabel}
			/>
			<SelectWithLabel
				label={__('applies to')}
				onChangeValue={onChangeValue('appliesTo')}
				value={formSection.appliesTo}
				options={APPLIES_TO_OPTIONS}
			/>
		</>
	);
};
