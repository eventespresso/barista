import { useCallback, useState } from 'react';

import { __ } from '@eventespresso/i18n';
import { formatISO } from 'date-fns';

import { Button } from '@eventespresso/ui-components';
import { DatePicker } from '@eventespresso/ee-components';
import { Box } from '@eventespresso/adapters';
import { useTimeZoneTime } from '@eventespresso/services';
import { Insert } from '@eventespresso/icons';
import type { DatePickerProps } from '@eventespresso/dates';

import { useFormState, useGenerateDates } from '../../data';
import { getMaxDatesLimit } from '../../utils';

const RDate: React.FC = () => {
	const { addRDate, rRule } = useFormState();
	const [date, setDate] = useState<DatePickerProps['value']>();
	const { siteTimeToUtc } = useTimeZoneTime();
	// rDates and gDates, no exDates
	const generatedDates = useGenerateDates();

	const maxLimit = getMaxDatesLimit(rRule);

	const onAddDate = useCallback(() => {
		addRDate(formatISO(siteTimeToUtc(date)));
		setDate(null);
	}, [addRDate, date, siteTimeToUtc]);

	const onChange = useCallback((newDate: Date) => {
		setDate(newDate);
	}, []);

	// to disable the input if the limit is reached
	const limitReached = generatedDates.length >= maxLimit;

	return (
		<Box display='flex' alignItems='center'>
			<DatePicker onChange={onChange} value={date} disabled={limitReached} />
			<Button
				className={'ee-generated-date--add__event'}
				icon={Insert}
				onClick={onAddDate}
				buttonText={__('Add Extra Event Date')}
				isDisabled={!date || limitReached}
			/>
		</Box>
	);
};

export default RDate;
