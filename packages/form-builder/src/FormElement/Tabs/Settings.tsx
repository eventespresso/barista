import { __ } from '@eventespresso/i18n';
import { SwitchWithLabel, TextInputWithLabel, withLabel, SelectWithLabel } from '@eventespresso/ui-components';
import { SimpleTextEditor } from '@eventespresso/rich-text-editor';

import type { FormElementProps } from '../../types';
import FieldOptions from './FieldOptions';
import { isFieldWithOptions } from '../../utils';
import { useUpdateElement } from '../useUpdateElement';
import { InputType } from './InputType';
import { isFieldOfType } from '../../utils';
import { useFormState } from '../../state';

const RTEWithLabel = withLabel(SimpleTextEditor);

export const Settings: React.FC<FormElementProps> = ({ element }) => {
	const onChangeValue = useUpdateElement(element);

	const { mapsToOptions } = useFormState();

	return (
		<>
			{
				// HTML doesn't need a public label
				!isFieldOfType(['HTML'], element) && (
					<TextInputWithLabel
						label={__('public label')}
						onChangeValue={onChangeValue('label.publicLabel')}
						value={element.label?.publicLabel}
					/>
				)
			}
			<TextInputWithLabel
				label={__('admin label')}
				onChangeValue={onChangeValue('label.adminLabel')}
				value={element.label?.adminLabel}
			/>
			{isFieldOfType(['HTML'], element) ? (
				<>
					<RTEWithLabel
						label={__('content')}
						defaultValue={element.label?.html}
						onChangeValue={onChangeValue('label.html')}
					/>
				</>
			) : (
				<>
					{isFieldWithOptions(element) ? (
						<FieldOptions element={element} label={__('options')} />
					) : (
						<TextInputWithLabel
							label={__('placeholder')}
							onChangeValue={onChangeValue('attributes.placeholder')}
							value={element.attributes?.placeholder}
						/>
					)}
					<SwitchWithLabel
						label={__('admin only')}
						onChangeValue={onChangeValue('adminOnly')}
						isChecked={element.adminOnly}
					/>
					<TextInputWithLabel
						label={__('help text')}
						onChangeValue={onChangeValue('helpText.helpText')}
						value={element.helpText?.helpText}
					/>
					<InputType element={element} />
				</>
			)}
			{mapsToOptions && (
				<SelectWithLabel
					label={__('maps to')}
					onChangeValue={onChangeValue('mapsTo')}
					value={element.mapsTo}
					options={mapsToOptions}
				/>
			)}
		</>
	);
};
