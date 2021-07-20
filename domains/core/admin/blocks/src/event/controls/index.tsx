import { InspectorControls } from '@wordpress/block-editor';
import { __ } from '@eventespresso/i18n';
import { PanelBody } from '@wordpress/components';

import { SelectEvent } from './SelectEvent';
import { SelectField } from './SelectField';

export const Controls: React.FC = (props) => {
	return (
		<InspectorControls>
			<PanelBody title={__('Settings')}>
				<SelectEvent {...props} />
				<SelectField {...props} />
			</PanelBody>
		</InspectorControls>
	);
};
