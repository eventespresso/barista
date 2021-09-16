import { useMemo } from 'react';
import * as R from 'ramda';

import { FormBuilderProps } from '@eventespresso/form-builder';
import { Banner } from '@eventespresso/ui-components';
import { sprintf, __ } from '@eventespresso/i18n';
import { isNotSharedOrDefault, getGuids } from '@eventespresso/predicates';

const hasAttendeeFirstName = R.any(R.allPass([R.propEq('type', 'TEXT'), R.propEq('mapsTo', 'Attendee.fname')]));
const hasAttendeeEmailName = R.any(R.allPass([R.propEq('type', 'EMAIL'), R.propEq('mapsTo', 'Attendee.email')]));

export const ErrorMessage: FormBuilderProps['topBanner'] = ({ elements, sections }) => {
	let message = '';

	const info = useMemo(() => {
		// Lets filter not consider default or shared sections
		const formSectionIds = getGuids(Object.values(sections).filter(isNotSharedOrDefault));

		const formElements = Object.values(elements).filter(
			// filters out the elements that belong to shared or default section
			R.propSatisfies(R.flip(R.includes)(formSectionIds), 'belongsTo')
		);
		return {
			hasFirstName: hasAttendeeFirstName(formElements),
			hasEmail: hasAttendeeEmailName(formElements),
		};
	}, [elements, sections]);

	if (!info.hasFirstName) {
		message = sprintf(
			/* translators: field name */
			__('Registration form must have a field of type "%1$s" which maps to "%2$s"'),
			__('Text Input'),
			__('Attendee First Name')
		);
	} else if (!info.hasEmail) {
		message = sprintf(
			/* translators: field name */
			__('Registration form must have a field of type "%1$s" which maps to "%2$s"'),
			__('Email Address'),
			__('Attendee Email Address')
		);
	}

	if (!message) {
		return null;
	}

	return <Banner description={message} status='error' title={__('Please add the required fields')} />;
};
