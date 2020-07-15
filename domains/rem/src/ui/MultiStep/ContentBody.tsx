import React from 'react';
import { __ } from '@wordpress/i18n';

import { Button } from '@eventespresso/components';

import { ExclusionPattern, RecurrencePattern } from '../recurrence';
import { DatetimeDetails } from '../datetimeDetails';
import { GeneratedDates } from '../generatedDates';
import Steps from './Steps';
import Tickets from '../Tickets';
import { useDatetime, useStepsState } from '../../context';
import { useDateRecurrence } from '../../services/apollo';

import type { ContentBodyProps } from './types';

const ContentBody: React.FC<ContentBodyProps> = ({ isRecurrenceOpen, onRecurrenceOpen }) => {
	const { current } = useStepsState();
	const datetime = useDatetime();
	const recurrence = useDateRecurrence(datetime.id);

	if (!isRecurrenceOpen || !recurrence) {
		return <Button buttonText={__('Convert date')} onClick={onRecurrenceOpen} />;
	}

	return (
		<div>
			<Steps current={current} />
			{current === 0 && <RecurrencePattern />}
			{current === 1 && <ExclusionPattern />}
			{current === 2 && <DatetimeDetails datetime={datetime} />}
			{current === 3 && <Tickets />}
			{current === 4 && <GeneratedDates />}
		</div>
	);
};

export default ContentBody;
