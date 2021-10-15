import { useCallback, useState } from 'react';

import { __, sprintf } from '@eventespresso/i18n';
import { formatISO } from 'date-fns';

import { Button, WarningMessage } from '@eventespresso/ui-components';
import { DatePicker } from '@eventespresso/ee-components';
import { Box } from '@eventespresso/adapters';
import { useTimeZoneTime } from '@eventespresso/services';
import { Insert } from '@eventespresso/icons';
import type { DatePickerProps } from '@eventespresso/dates';

import { useFormState, useGenerateDates } from '../../data';
import { getMaxDatesLimit } from '../../utils';
import { R_DATE_LIMIT } from '../../constants';

const RDate: React.FC = () => {
	const { addRDate, rRule, rDates, exDates } = useFormState();
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

	const exDatesLimitReached = exDates.length >= R_DATE_LIMIT;
	const rDatesLimitReached = rDates.length >= R_DATE_LIMIT;

	// to disable the input if the limit is reached
	const limitReached = generatedDates.length >= maxLimit || rDatesLimitReached;

	return (
		<>
			<Box display='flex' alignItems='center'>
				<DatePicker onChange={onChange} value={date} disabled={limitReached} />
				<Button
					className={'ee-generated-date__add-date-btn'}
					icon={Insert}
					onClick={!limitReached ? onAddDate : null}
					buttonText={__('Add Extra Event Date')}
					isDisabled={!date || limitReached}
				/>
			</Box>
			{rDatesLimitReached && (
				<WarningMessage
					message={sprintf(
						/* translators: date limit */
						__('You can add a maximum of %d extra dates.'),
						R_DATE_LIMIT
					)}
				/>
			)}
			{exDatesLimitReached && (
				<WarningMessage
					message={sprintf(
						/* translators: date limit */
						__('You can remove a maximum of %d from the list of generated dates.'),
						R_DATE_LIMIT
					)}
				/>
			)}
		</>
	);
};

export default RDate;
