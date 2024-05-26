import * as Chakra from '@chakra-ui/react';
import { UseEditableReturn } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';

import { Textarea } from '.';

import type { Props } from './types';

export const InlineEdit: React.FC<Required<Props.InlineEdit>> = ({
	container: { placeholder, value, defaultValue, ...container },
	preview: { component: Preview, legacyComponent: LegacyPreview, ...preview },
	input: { _fries, ...input },
}) => {
	const initialValue: Type.Value = useMemo(() => {
		return defaultValue || value || '';
	}, [value, defaultValue]);

	const [state, setState] = useState(initialValue);

	// this happens when value is updated *outside* this component
	useEffect(() => {
		setState(initialValue);
	}, [value, defaultValue]);

	const convertLegacyPreviewProps = (): Props.Legacy.InlineEditPreviewProps => {
		const props: Props.Legacy.InlineEditPreviewProps = {};

		if (preview.tooltip) props.tooltip = preview.tooltip;
		if (preview.className) props.className = preview.className;
		if (preview['aria-describedby']) {
			props['aria-describedby'] = preview['aria-describedby'];
		}

		return props;
	};

	const onSubmit: Type.OnSubmit = (newValue) => {
		/**
		 * Existing consumers of this component treat 'onChange' as
		 * 'onSubmit' i.e. updating database as soon as change happens
		 * but we want to separate 'onChange' and 'onSubmit'
		 */
		if (container.onSubmit) container.onSubmit(newValue);
		if (container.onChange) container.onChange(newValue);
	};

	const onChange: Type.OnChange = (newValue) => {
		setState(newValue);
	};

	return (
		<Chakra.Editable
			placeholder={placeholder ?? ''}
			{...container}
			onChange={onChange}
			onSubmit={onSubmit}
			value={state}
		>
			{/* TODO: this looks messy... */}
			{({ isEditing, onEdit }) => (
				<>
					{LegacyPreview && (
						<LegacyPreview
							value={state}
							isEditing={isEditing}
							onRequestEdit={onEdit}
							{...convertLegacyPreviewProps()}
						/>
					)}
					{Preview && <Preview {...preview} />}
					{!Preview && !LegacyPreview && <Chakra.EditablePreview {...preview} />}

					{isText(_fries, input) && <Chakra.EditableInput {...input} />}
					{isTextarea(_fries, input) && <Textarea _fries='textarea' {...input} />}
				</>
			)}
		</Chakra.Editable>
	);
};

// TODO: after everything is done, review the types again
module Type {
	export type OnSubmit = NoUndefined<Editable['onSubmit']>;
	export type OnChange = NoUndefined<Editable['onChange']>;
	export type Value = NoUndefined<Editable['value']>;

	type Editable = Chakra.EditableProps;
	type NoUndefined<T extends any> = Exclude<T, undefined>;
}

// TODO: do I need to update this or no?
function isText(
	type: Props.Input['_fries'],
	input: Omit<Props.Input, '_fries'> & ReturnType<UseEditableReturn['getInputProps']>
): input is Omit<Props.InputForText, '_fries'> {
	return type === 'text';
}

// TODO: do I need to update this or no?
function isTextarea(
	type: Props.Input['_fries'],
	input: Omit<Props.Input, '_fries'> & ReturnType<UseEditableReturn['getInputProps']>
): input is Omit<Props.InputForTextarea, '_fries'> {
	return type === 'textarea';
}
