import { InspectorControls, BlockControls, AlignmentToolbar, FontSizePicker } from '@wordpress/block-editor';
import { __ } from '@eventespresso/i18n';
import { PanelBody } from '@wordpress/components';
import { Fragment } from '@wordpress/element';

import { SelectEvent } from './SelectEvent';
import { SelectField } from './SelectField';
import { useOnChangeStyle } from './useOnChangeStyle';

export const Controls: React.FC<any> = (props) => {
	const { attributes, setAttributes } = props;

	const onChange = useOnChangeStyle(attributes, setAttributes);

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__('Settings')}>
					<SelectEvent {...props} />
					<SelectField {...props} />
				</PanelBody>
				<PanelBody title={__('Style')}>
					<FontSizePicker value={attributes.style.fontSize} onChange={onChange('fontSize')} />
				</PanelBody>
			</InspectorControls>
			<BlockControls>
				<AlignmentToolbar value={attributes.style.textAlign} onChange={onChange('textAlign')} />
			</BlockControls>
		</Fragment>
	);
};
