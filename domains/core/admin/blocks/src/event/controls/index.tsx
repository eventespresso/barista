import {
	InspectorControls,
	BlockControls,
	AlignmentToolbar,
	FontSizePicker,
	PanelColorSettings,
} from '@wordpress/block-editor';
import { __ } from '@eventespresso/i18n';
import { PanelBody } from '@wordpress/components';
import { Fragment, useMemo } from '@wordpress/element';

import { SelectEvent } from './SelectEvent';
import { SelectField } from './SelectField';
import { useOnChangeStyle } from './useOnChangeStyle';
import { EventFieldAttributes, EventFieldEditProps } from '../types';

export const Controls: React.FC<EventFieldEditProps> = (props) => {
	const { attributes, setAttributes } = props;

	const onChange = useOnChangeStyle<EventFieldAttributes>(attributes, setAttributes);

	const colorSettings = useMemo<PanelColorSettings.Props['colorSettings']>(
		() => [
			{
				value: attributes.style.color,
				onChange: onChange('color'),
				label: __('Text Color'),
			},
			{
				value: attributes.style.backgroundColor,
				onChange: onChange('backgroundColor'),
				label: __('Background Color'),
			},
		],
		[attributes.style.backgroundColor, attributes.style.color, onChange]
	);

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__('Settings')}>
					<SelectEvent {...props} />
					<SelectField {...props} />
				</PanelBody>
				<PanelBody title={__('Typography')} initialOpen={false}>
					<FontSizePicker value={attributes.style.fontSize as number} onChange={onChange('fontSize')} />
				</PanelBody>
				<PanelColorSettings title={__('Color')} colorSettings={colorSettings} initialOpen={false} />
			</InspectorControls>
			<BlockControls>
				<AlignmentToolbar value={attributes.style.textAlign} onChange={onChange('textAlign')} />
			</BlockControls>
		</Fragment>
	);
};
