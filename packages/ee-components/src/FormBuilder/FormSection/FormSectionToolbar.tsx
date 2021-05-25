import classNames from 'classnames';

import { __ } from '@eventespresso/i18n';
import { DragHandle, Trash } from '@eventespresso/icons';
import { Button, IconButton, Select } from '@eventespresso/ui-components';

import { ELEMENT_BLOCKS } from '../constants';
import type { FormSectionToolbarProps } from '../types';

const elementtypes = ELEMENT_BLOCKS.map((tag) => {
	return {
		label: tag.label,
		value: tag.type,
	};
});
const locations = [
	{
		label: __('top'),
		value: 'top',
	},
	{
		label: __('bottom'),
		value: 'bottom',
	},
];

export const FormSectionToolbar: React.FC<FormSectionToolbarProps> = ({ active, formSection }) => {
	const toolbarClass = classNames('ee-form-section__toolbar', active && 'ee-form-section__toolbar--active');
	const tools = active && (
		<div className={'ee-form-section__toolbar-tools'}>
			<div className='ee-form-section__toolbar-item'>
				<Select
					id={`${formSection.UUID}-add-new-section-selector`}
					label={__('add new')}
					options={elementtypes}
					size='small'
				/>
				<Select
					id={`${formSection.UUID}-new-location-selector`}
					label={__('to the')}
					options={locations}
					size='small'
				/>
				<label
					aria-label=' of this form section'
					className='ee-input-label'
					id={`${formSection.UUID}-new-location-selector-label`}
					htmlFor={`${formSection.UUID}-new-location-selector`}
				>
					{__('of this form section')}
				</label>
				<Button buttonText={__('Add')} size='small' />
			</div>
			<div className='ee-form-section__toolbar-item'>
				<IconButton icon={Trash} borderless size='small' transparentBg />
				<IconButton icon={DragHandle} borderless className='ee-drag-handle' size='small' transparentBg />
			</div>
		</div>
	);
	return <div className={toolbarClass}>{tools}</div>;
};
