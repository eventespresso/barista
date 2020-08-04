import React from 'react';
import { __ } from '@wordpress/i18n';

import { Heading, Legend } from '@eventespresso/components';

import Datetimes from './Datetimes';
import useGenerateDates from './useGenerateDates';
import { legendConfig } from './config';

const GeneratedDates: React.FC = () => {
	const datetimes = useGenerateDates(true);

	return (
		<>
			<div className='rrule-generator-wrapper'>
				<h2 className='rrule-generator__sidebar-label'>{__('Dates List')}</h2>
				<div className='rrule-generator__main-content'>
					<Datetimes datetimes={datetimes} />
				</div>
			</div>
			<Heading as='h6' topBordered>
				{__('Legend')}
			</Heading>
			<Legend direction='row' legendConfig={legendConfig} />
		</>
	);
};

export default GeneratedDates;
