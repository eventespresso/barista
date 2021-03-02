import { useEffect, useState } from 'react';

import { Box, Grid } from '@eventespresso/adapters';
import { Upsell } from '@eventespresso/ui-components';

const FormWrapper: React.FC<any> = ({ children, form }) => {
	const { values } = form.getState();
	const [previewState, setPreviewState] = useState(values);

	useEffect(() => {
		const unsubscribe = form.subscribe(
			(state) => {
				setPreviewState(state?.values);
			},
			{ values: true }
		);

		return unsubscribe;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Grid columns={2} gap={6}>
			<Box w='100%'>{children}</Box>

			<Box w='100%'>
				<Upsell {...previewState} templateId='base' />
			</Box>
		</Grid>
	);
};

export default FormWrapper;
