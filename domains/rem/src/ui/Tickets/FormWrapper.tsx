import React, { useEffect } from 'react';
import type { FormRenderProps } from 'react-final-form';
import { useFormState } from '../../data';

const FormWrapper: React.FC<FormRenderProps> = ({ children, form }) => {
	const { setTickets } = useFormState();

	useEffect(() => {
		// subscribe to RFF state.
		const unsubscribe = form.subscribe(
			(state) => {
				// @ts-ignore
				setTickets(state?.values);
			},
			{ values: true }
		);

		// housekeeping
		return unsubscribe;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <>{children}</>;
};

export default FormWrapper;
