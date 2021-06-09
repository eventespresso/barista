import { useEffect } from 'react';

import { __ } from '@eventespresso/i18n';
import { withFeature } from '@eventespresso/services';
import { Heading } from '@eventespresso/ui-components';
import { FormBuilder } from '@eventespresso/form-builder';
import { getEdtrDomData } from '@eventespresso/edtr-services';

import { APPLIES_TO_OPTIONS, MAPS_TO_OPTIONS } from './constants';
import { ErrorMessage } from './ErrorMessage';
import { hideAllExcept } from '../utils';

const header = (
	<Heading as='h3' className='ee-edtr-section-heading'>
		{__('Registration Form')}
	</Heading>
);

export const RegistrationForm: React.FC = () => {
	useEffect(() => hideAllExcept([]), []);
	const { elements, sections, topLevelSectionId } = getEdtrDomData('formBuilder');

	return (
		<FormBuilder
			appliesToOptions={APPLIES_TO_OPTIONS}
			containerClassName='ee-edtr-section'
			header={header}
			initialElements={elements}
			initialSections={sections}
			mapsToOptions={MAPS_TO_OPTIONS}
			topBanner={ErrorMessage}
			topLevelSectionId={topLevelSectionId}
			onChange={console.log}
		/>
	);
};

export default withFeature('use_reg_form_builder')(RegistrationForm);
