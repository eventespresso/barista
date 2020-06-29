import { __ } from '@wordpress/i18n';
import * as yup from 'yup';

import { yupToFinalFormErrors } from '@eventespresso/form';
import { DateFormShape } from './types';
import { dateAndTimeSchema } from '@eventespresso/edtr-services';

export const validate = async (values: DateFormShape): Promise<any> => {
	return await yupToFinalFormErrors(validationSchema, values);
};

const validationSchema = yup.object({
	name: yup
		.string()
		.required(() => __('Name is required'))
		.min(3, () => __('Name must be at least three characters')),
	dateTime: dateAndTimeSchema,
});
