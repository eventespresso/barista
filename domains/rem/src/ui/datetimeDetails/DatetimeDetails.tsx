import { useState } from 'react';

import { Datetime, useDatetimes } from '@eventespresso/edtr-services';
import { FormWithConfig } from '@eventespresso/ee-components';
import { EntityTemplate } from '@eventespresso/ui-components';
import { __ } from '@eventespresso/i18n';

import useDatetimeFormConfig from './useDateFormConfig';
import type { DatetimeDetailsProps } from './types';
import FormWrapper from './FormWrapper';
import { useFormState } from '../../data';

const DatetimeDetails: React.FC<DatetimeDetailsProps> = () => {
	const [templateDate, setTemplateDate] = useState<Partial<Datetime>>({});
	const { dateDetails } = useFormState();
	const formConfig = useDatetimeFormConfig(templateDate, { initialValues: dateDetails });

	const allDates = useDatetimes();

	return (
		<>
			<EntityTemplate addEntity={setTemplateDate} entityType={__('datetime')} templates={allDates} />
			<FormWithConfig
				// add the key to ensure the form resets when template is changed
				// because description field uses RTE in uncontrolled mode,
				// thus value doesn't update on template change
				key={templateDate.id}
				{...formConfig}
				formWrapper={FormWrapper}
			/>
		</>
	);
};

export default DatetimeDetails;
