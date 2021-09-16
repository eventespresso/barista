import { useCallback, useState } from 'react';

import { __ } from '@eventespresso/i18n';
import { Save } from '@eventespresso/icons';
import { RadioGroup } from '@eventespresso/adapters';
import { IconButton, Radio, PopoverForm, PopoverFormProps } from '@eventespresso/ui-components';

import { useFormState } from '../state';
import type { FormSectionProps, FormStatus } from '../types';

export const SaveSection: React.FC<FormSectionProps> = ({ formSection }) => {
	const { isElementOpen, copySection } = useFormState();
	const tabIndex = isElementOpen({ id: formSection.id }) ? 0 : -1;

	const [value, setValue] = useState('SHARED');
	const onSave = useCallback(() => {
		// Lets create a copy of the section with status set to the selected value
		copySection({
			id: formSection.id,
			section: { status: value as FormStatus, belongsTo: '', order: 0 },
			afterId: '',
		});
	}, [copySection, formSection.id, value]);

	const renderTrigger = useCallback<PopoverFormProps['renderTrigger']>(
		({ onOpen, ...props }) => (
			<IconButton
				{...props}
				borderless
				className='ee-form-section__toolbar-button'
				icon={Save}
				onClick={onOpen}
				size='smaller'
				tabIndex={tabIndex}
				tooltip={__('save form section for use in other forms')}
				transparentBg
			/>
		),
		[tabIndex]
	);

	const id = `save-section-${formSection.id}`;
	return (
		<PopoverForm
			closeOnBlur
			renderTrigger={renderTrigger}
			title={__('save form section for use in other forms')}
			onSubmit={onSave}
		>
			<label id={`${id}-label`} htmlFor={id}>
				{__('save as')}
			</label>
			<RadioGroup value={value} onChange={setValue} id={id} aria-labelledby={`${id}-label`}>
				<Radio value='DEFAULT' aria-describedby={`${id}-default-desc`}>
					{__('default')}
				</Radio>
				<p id={`${id}-default-desc`}>
					{__(' a copy of this form section will be automatically added to ALL new events')}
				</p>
				<Radio value='SHARED' aria-describedby={`${id}-shared-desc`}>
					{__('shared')}
				</Radio>
				<p id={`${id}-shared-desc`}>
					{__('a copy of this form section will be saved for use in other events but not loaded by default')}
				</p>
			</RadioGroup>
		</PopoverForm>
	);
};
