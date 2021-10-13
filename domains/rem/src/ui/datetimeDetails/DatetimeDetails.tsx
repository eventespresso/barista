import { useState } from 'react';

import * as R from 'ramda';

import { Datetime } from '@eventespresso/edtr-services';
import { FormWithConfig } from '@eventespresso/ee-components';
import useDatetimeFormConfig from './useDateFormConfig';
import type { DatetimeDetailsProps } from './types';
import FormWrapper from './FormWrapper';
import DateTemplate from './DateTemplate';
import { useFormState } from '../../data';

const DatetimeDetails: React.FC<DatetimeDetailsProps> = () => {
	const [templateDate, setTemplateDate] = useState<Datetime>();
	const { dateDetails } = useFormState();
	const formConfig = useDatetimeFormConfig(templateDate, { initialValues: dateDetails });

	const hasEmptyFormData = R.isEmpty(dateDetails);

	return (
		<>
			<DateTemplate setTemplate={setTemplateDate} hideAddNew={!hasEmptyFormData} />
			{(templateDate || !hasEmptyFormData) && <FormWithConfig {...formConfig} formWrapper={FormWrapper} />}
		</>
	);
};

export default DatetimeDetails;
