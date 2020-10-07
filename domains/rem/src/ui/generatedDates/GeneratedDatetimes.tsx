import React, { useMemo } from 'react';

import { setTimeFromDate } from '@eventespresso/dates';

import GeneratedDatetime from './GeneratedDatetime';
import { GeneratedDatetimesProps } from './types';
import { useFormState } from '../../data';

const GeneratedDatetimes: React.FC<GeneratedDatetimesProps> = ({ datetimes }) => {
	const { addExDate, removeRDate, removeExDate, dateDetails } = useFormState();

	const setStartTime = useMemo(() => setTimeFromDate(dateDetails?.startTime), [dateDetails?.startTime]);

	return (
		<ul className={'ee-generated-datetime__list'}>
			{datetimes.map(({ date, ISOStr, type }, index) => {
				const isRDate = type === 'rDate';
				const isExDate = type === 'exDate';

				let toggleExDate = isRDate ? removeRDate : addExDate;
				toggleExDate = isExDate ? removeExDate : toggleExDate;

				return (
					<GeneratedDatetime
						date={setStartTime(date)}
						key={ISOStr}
						ISOStr={ISOStr}
						number={index + 1}
						toggleExDate={toggleExDate}
						type={type}
					/>
				);
			})}
		</ul>
	);
};

export default GeneratedDatetimes;
